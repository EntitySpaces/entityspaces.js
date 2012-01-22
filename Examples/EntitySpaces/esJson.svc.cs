/*
===============================================================================
                    EntitySpaces 2012 by EntitySpaces, LLC
             Persistence Layer and Business Objects for Microsoft .NET
             EntitySpaces(TM) is a legal trademark of EntitySpaces, LLC
                          http://www.entityspaces.net
===============================================================================
EntitySpaces Version : 2012.1.0000.0
EntitySpaces Driver  : SQL
Date Generated       : 1/7/2012 4:54:11 PM
===============================================================================
*/

using System;
using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;

using BusinessObjects;
using EntitySpaces.Interfaces;
using EntitySpaces.js;
using EntitySpaces.Loader;

namespace EntitySpaces.Services
{
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceContract()]
    public partial class esJson
    {
        public esJson()
        {
            esProviderFactory.Factory = new esDataProviderFactory();
        }

        #region IEmployees Members
        
        [WebInvoke(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]	
        public jsResponse<EmployeesCollection, Employees> EmployeesCollection_LoadAll()
        {
            jsResponse<EmployeesCollection, Employees> response = new jsResponse<EmployeesCollection, Employees>();

            try
            {
                EmployeesCollection collection = new EmployeesCollection();
                collection.LoadAll();
                response.collection = collection;
            }
            catch (Exception ex)
            {
                response.exception = ex.Message;
            }

            return response;
        }

        [WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
        public jsResponse<EmployeesCollection, Employees> EmployeesCollection_Save(EmployeesCollection collection)
        {
            jsResponse<EmployeesCollection, Employees> response = new jsResponse<EmployeesCollection, Employees>();

            try
            {
                collection.Save();
                response.collection = collection;
            }
            catch (Exception ex)
            {
                response.exception = ex.Message;
            }

            return response;
        }
        
        [WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
        public jsResponse<EmployeesCollection, Employees> Employees_LoadByPrimaryKey(System.Int32 employeeID)
        {
            jsResponse<EmployeesCollection, Employees> response = new jsResponse<EmployeesCollection, Employees>();

            try
            {
                Employees entity = new Employees();
                if (entity.LoadByPrimaryKey(employeeID))
                {
                    response.entity = entity;
                }
            }
            catch (Exception ex)
            {
                response.exception = ex.Message;
            }

            return response;
        }

        [WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
        public jsResponse<EmployeesCollection, Employees> Employees_Save(Employees entity)
        {
            jsResponse<EmployeesCollection, Employees> response = new jsResponse<EmployeesCollection, Employees>();

            System.Diagnostics.Debugger.Break();

            try
            {
                entity.Save();
                response.entity = entity;
            }
            catch (Exception ex)
            {
                response.exception = ex.Message;
            }

            return response;
        }

        #endregion
    }
}
