using System;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using EntitySpaces.Interfaces;
using EntitySpaces.js;
using EntitySpaces.Loader;
using EntitySpaces.DynamicQuery;

using BusinessObjects;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.Web;
using System.Web.Script.Services;
using EntitySpaces.Core;

namespace EntitySpaces.Services
{
    public partial class esJson
    {
        private void Authenticate()
        {
            // A couple of ways to get at the cookie

            //--------------------------------------------------
            // Commented out but probably the easier way
            //--------------------------------------------------
            /*
            var req = HttpContext.Current.Request;
            string cookieValue = req.Cookies[0].Value;
            */

            //--------------------------------------------------------------------------------------
            // Of course, this isn't enough security, you could for instance store the user id and
            // the ip address in the cookie, and verify this information in the user table, that you
            // would have filled in when the user logged in.
            //
            // Here we are just ensuring any ol' cookie exists to show you how your WCF service can
            // get to this information.
            //--------------------------------------------------------------------------------------
            var properties = OperationContext.Current.IncomingMessageProperties;
            var property = properties[HttpRequestMessageProperty.Name] as HttpRequestMessageProperty;
            if (string.IsNullOrEmpty(property.Headers["Cookie"]))
            {
                //HttpContext.Current.Response.End();
                throw new Exception("Not Authenticated");
            }
        }

        [WebInvoke(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        public jsResponse<EmployeesCollection, Employees> Employees_LoadHierarchical()
        {
            jsResponse<EmployeesCollection, Employees> response = new jsResponse<EmployeesCollection, Employees>();

            try
            {
                // The Main Query
                EmployeesQuery q = new EmployeesQuery("e");
                q.Select(q.EmployeeID, q.FirstName, q.LastName, q.City, q.Country, q.HomePhone, q.Region, q.PostalCode, q.Title);
                q.Where(q.EmployeeID < 7);

                // The OrdersCollection
                OrdersQuery o1 = q.Prefetch<OrdersQuery>(Employees.Prefetch_OrdersCollectionByEmployeeID);
                EmployeesQuery emp1 = o1.GetQuery<EmployeesQuery>();
                o1.Where(emp1.EmployeeID < 7);

                // The OrdersDetailsCollection
                OrderDetailsQuery od = q.Prefetch<OrderDetailsQuery>(Employees.Prefetch_OrdersCollectionByEmployeeID, Orders.Prefetch_OrderDetailsCollectionByOrderID);
                EmployeesQuery emp2 = od.GetQuery<EmployeesQuery>();
                OrdersQuery o2 = od.GetQuery<OrdersQuery>();
                od.Where(emp2.EmployeeID < 7);

                // Load It
                EmployeesCollection coll = new EmployeesCollection();
                if (coll.Load(q))
                {
                    response.collection = coll;

                    response.columnCollection["Employees"] = jsColumn.PopulateColumns(coll[0]);
                    response.columnCollection["Orders"] = jsColumn.PopulateColumns(coll[0].OrdersCollectionByEmployeeID[0]);
                    response.columnCollection["OrderDetails"] = jsColumn.PopulateColumns(coll[0].OrdersCollectionByEmployeeID[0].OrderDetailsCollectionByOrderID[0]);
                }
            }
            catch (Exception ex)
            {
                response.exception = ex.Message;
            }

            return response;
        }

        [WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
        public jsResponse<EmployeesCollection, Employees> Employees_LoadByPrimaryKeyHierarchical(int primaryKey)
        {
            jsResponse<EmployeesCollection, Employees> response = new jsResponse<EmployeesCollection, Employees>();

            EmployeesQuery q = new EmployeesQuery();
            q.Select(q.EmployeeID, q.FirstName, q.LastName, q.LastName.As("ExtraColumn"), q.EmployeeID.As("IDasExtraColumn"));
            q.Where(q.EmployeeID == primaryKey);

            Employees emp = new Employees();
            emp.Load(q);

            int count1 = emp.OrdersCollectionByEmployeeID.Count;
            int count2 = emp.OrdersCollectionByEmployeeID[0].OrderDetailsCollectionByOrderID.Count;

            response.entity = emp;

            return response;
        }

        [WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
        public jsResponse<EmployeesCollection, Employees> Employees_Pager(jsPagerRequest request)
        {
            jsResponse<EmployeesCollection, Employees> response = new jsResponse<EmployeesCollection, Employees>();

            try
            {
                // We send the the same data they sent us back
                response.pagerRequest = request;

                EmployeesQuery q = null;
                if (response.pagerRequest.getTotalRows == true)
                {
                    // Get the total count of rows in the Employee table
                    q = new EmployeesQuery();
                    q.es.CountAll = true;

                    response.pagerRequest.totalRows = q.ExecuteScalar<int>();
                }

                q = new EmployeesQuery();
                q.Select(q.EmployeeID, q.FirstName, q.LastName, q.Title);

                if (request.sortCriteria != null && request.sortCriteria.Length > 0)
                {
                    for (int i = 0; i < request.sortCriteria.Length; i++)
                    {
                        jsPagerSortCriteria sort = request.sortCriteria[i];

                        q.OrderBy(sort.column, sort.direction.ToUpper().StartsWith("A") ?
                            esOrderByDirection.Ascending : esOrderByDirection.Descending);
                    }
                }
                else
                {
                    // Default sort if none is specified
                    q.OrderBy(q.EmployeeID.Ascending);
                }

                if (request.filterCriteria != null && request.filterCriteria.Length > 0)
                {
                    esComparison comp = null;

                    for (int i = 0; i < request.filterCriteria.Length; i++)
                    {
                        jsPagerFilterCriteria filter = request.filterCriteria[i];
                        comp = q.ManualWhere(filter.column, filter.operation, filter.criteria1, filter.criteria2, filter.conjuction);
                    }

                    q.Where(comp);
                }

                // Set the paging indicators up
                q.es.PageNumber = request.pageNumber;
                q.es.PageSize = request.pageSize;

                EmployeesCollection coll = new EmployeesCollection();
                coll.Load(q);

                response.pagerRequest.getTotalRows = false;
                response.collection = coll;
            }
            catch (Exception ex)
            {
                response.exception = ex.Message;
            }

            return response;
        }
    }
}
