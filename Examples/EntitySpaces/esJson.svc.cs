/*
===============================================================================
                    EntitySpaces 2012 by EntitySpaces, LLC
             Persistence Layer and Business Objects for Microsoft .NET
             EntitySpaces(TM) is a legal trademark of EntitySpaces, LLC
                          http://www.entityspaces.net
===============================================================================
EntitySpaces Version : 2012.1.0000.0
EntitySpaces Driver  : SQL
Date Generated       : 2/2/2012 6:55:38 PM
===============================================================================
*/

using System;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using EntitySpaces.Interfaces;
using EntitySpaces.js;
using EntitySpaces.Loader;

using BusinessObjects;

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
		
		#region ICategories Members
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]	
		public jsResponse<CategoriesCollection, Categories> CategoriesCollection_LoadAll()
		{
			jsResponse<CategoriesCollection, Categories> response = new jsResponse<CategoriesCollection, Categories>();

			try
			{
				CategoriesCollection collection = new CategoriesCollection();
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
		public jsResponse<CategoriesCollection, Categories> CategoriesCollection_Save(CategoriesCollection collection)
		{
			jsResponse<CategoriesCollection, Categories> response = new jsResponse<CategoriesCollection, Categories>();

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
		public jsResponse<CategoriesCollection, Categories> Categories_LoadByPrimaryKey(System.Int32 categoryID)
		{
			jsResponse<CategoriesCollection, Categories> response = new jsResponse<CategoriesCollection, Categories>();

			try
			{
				Categories entity = new Categories();
				if (entity.LoadByPrimaryKey(categoryID))
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
		public jsResponse<CategoriesCollection, Categories> Categories_Save(Categories entity)
		{
			jsResponse<CategoriesCollection, Categories> response = new jsResponse<CategoriesCollection, Categories>();

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
		
		// Hierarchical Data Access Methods Start Here ...
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<ProductsCollection, Products> Categories_ProductsCollectionByCategoryID(System.Int32 categoryID)
		{
			jsResponse<ProductsCollection, Products> response = new jsResponse<ProductsCollection, Products>();

			try
			{
				Categories entity = new Categories();
				entity.CategoryID = categoryID;
				response.collection = entity.ProductsCollectionByCategoryID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
				
		
		#endregion
		
		#region ICustomerCustomerDemo Members
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]	
		public jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo> CustomerCustomerDemoCollection_LoadAll()
		{
			jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo> response = new jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo>();

			try
			{
				CustomerCustomerDemoCollection collection = new CustomerCustomerDemoCollection();
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
		public jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo> CustomerCustomerDemoCollection_Save(CustomerCustomerDemoCollection collection)
		{
			jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo> response = new jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo>();

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
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
		public jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo> CustomerCustomerDemo_LoadByPrimaryKey(System.String customerID, System.String customerTypeID)
		{
			jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo> response = new jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo>();

			try
			{
				CustomerCustomerDemo entity = new CustomerCustomerDemo();
				if (entity.LoadByPrimaryKey(customerID, customerTypeID))
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
		public jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo> CustomerCustomerDemo_Save(CustomerCustomerDemo entity)
		{
			jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo> response = new jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo>();

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
		
		// Hierarchical Data Access Methods Start Here ...
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
		public jsResponse<CustomerDemographicsCollection, CustomerDemographics> CustomerCustomerDemo_UpToCustomerDemographicsByCustomerTypeID(System.String customerID, System.String customerTypeID)
		{
			jsResponse<CustomerDemographicsCollection, CustomerDemographics> response = new jsResponse<CustomerDemographicsCollection, CustomerDemographics>();

			try
			{
				CustomerCustomerDemo entity = new CustomerCustomerDemo();
				entity.CustomerID = customerID;
				entity.CustomerTypeID = customerTypeID;
				response.entity = entity.UpToCustomerDemographicsByCustomerTypeID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
		public jsResponse<CustomersCollection, Customers> CustomerCustomerDemo_UpToCustomersByCustomerID(System.String customerID, System.String customerTypeID)
		{
			jsResponse<CustomersCollection, Customers> response = new jsResponse<CustomersCollection, Customers>();

			try
			{
				CustomerCustomerDemo entity = new CustomerCustomerDemo();
				entity.CustomerID = customerID;
				entity.CustomerTypeID = customerTypeID;
				response.entity = entity.UpToCustomersByCustomerID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
				
		
		#endregion
		
		#region ICustomerDemographics Members
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]	
		public jsResponse<CustomerDemographicsCollection, CustomerDemographics> CustomerDemographicsCollection_LoadAll()
		{
			jsResponse<CustomerDemographicsCollection, CustomerDemographics> response = new jsResponse<CustomerDemographicsCollection, CustomerDemographics>();

			try
			{
				CustomerDemographicsCollection collection = new CustomerDemographicsCollection();
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
		public jsResponse<CustomerDemographicsCollection, CustomerDemographics> CustomerDemographicsCollection_Save(CustomerDemographicsCollection collection)
		{
			jsResponse<CustomerDemographicsCollection, CustomerDemographics> response = new jsResponse<CustomerDemographicsCollection, CustomerDemographics>();

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
		public jsResponse<CustomerDemographicsCollection, CustomerDemographics> CustomerDemographics_LoadByPrimaryKey(System.String customerTypeID)
		{
			jsResponse<CustomerDemographicsCollection, CustomerDemographics> response = new jsResponse<CustomerDemographicsCollection, CustomerDemographics>();

			try
			{
				CustomerDemographics entity = new CustomerDemographics();
				if (entity.LoadByPrimaryKey(customerTypeID))
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
		public jsResponse<CustomerDemographicsCollection, CustomerDemographics> CustomerDemographics_Save(CustomerDemographics entity)
		{
			jsResponse<CustomerDemographicsCollection, CustomerDemographics> response = new jsResponse<CustomerDemographicsCollection, CustomerDemographics>();

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
		
		// Hierarchical Data Access Methods Start Here ...
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<CustomersCollection, Customers> CustomerDemographics_UpToCustomersCollection(System.String customerTypeID)
		{
			jsResponse<CustomersCollection, Customers> response = new jsResponse<CustomersCollection, Customers>();

			try
			{
				CustomerDemographics entity = new CustomerDemographics();
				entity.CustomerTypeID = customerTypeID;
				response.collection = entity.UpToCustomersCollection;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo> CustomerDemographics_CustomerCustomerDemoCollectionByCustomerTypeID(System.String customerTypeID)
		{
			jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo> response = new jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo>();

			try
			{
				CustomerDemographics entity = new CustomerDemographics();
				entity.CustomerTypeID = customerTypeID;
				response.collection = entity.CustomerCustomerDemoCollectionByCustomerTypeID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
				
		
		#endregion
		
		#region ICustomers Members
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]	
		public jsResponse<CustomersCollection, Customers> CustomersCollection_LoadAll()
		{
			jsResponse<CustomersCollection, Customers> response = new jsResponse<CustomersCollection, Customers>();

			try
			{
				CustomersCollection collection = new CustomersCollection();
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
		public jsResponse<CustomersCollection, Customers> CustomersCollection_Save(CustomersCollection collection)
		{
			jsResponse<CustomersCollection, Customers> response = new jsResponse<CustomersCollection, Customers>();

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
		public jsResponse<CustomersCollection, Customers> Customers_LoadByPrimaryKey(System.String customerID)
		{
			jsResponse<CustomersCollection, Customers> response = new jsResponse<CustomersCollection, Customers>();

			try
			{
				Customers entity = new Customers();
				if (entity.LoadByPrimaryKey(customerID))
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
		public jsResponse<CustomersCollection, Customers> Customers_Save(Customers entity)
		{
			jsResponse<CustomersCollection, Customers> response = new jsResponse<CustomersCollection, Customers>();

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
		
		// Hierarchical Data Access Methods Start Here ...
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<CustomerDemographicsCollection, CustomerDemographics> Customers_UpToCustomerDemographicsCollection(System.String customerID)
		{
			jsResponse<CustomerDemographicsCollection, CustomerDemographics> response = new jsResponse<CustomerDemographicsCollection, CustomerDemographics>();

			try
			{
				Customers entity = new Customers();
				entity.CustomerID = customerID;
				response.collection = entity.UpToCustomerDemographicsCollection;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo> Customers_CustomerCustomerDemoCollectionByCustomerID(System.String customerID)
		{
			jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo> response = new jsResponse<CustomerCustomerDemoCollection, CustomerCustomerDemo>();

			try
			{
				Customers entity = new Customers();
				entity.CustomerID = customerID;
				response.collection = entity.CustomerCustomerDemoCollectionByCustomerID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<OrdersCollection, Orders> Customers_OrdersCollectionByCustomerID(System.String customerID)
		{
			jsResponse<OrdersCollection, Orders> response = new jsResponse<OrdersCollection, Orders>();

			try
			{
				Customers entity = new Customers();
				entity.CustomerID = customerID;
				response.collection = entity.OrdersCollectionByCustomerID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
				
		
		#endregion
		
		#region IEmployees Members
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]	
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
		
		// Hierarchical Data Access Methods Start Here ...
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<EmployeesCollection, Employees> Employees_EmployeesCollectionByReportsTo(System.Int32 employeeID)
		{
			jsResponse<EmployeesCollection, Employees> response = new jsResponse<EmployeesCollection, Employees>();

			try
			{
				Employees entity = new Employees();
				entity.EmployeeID = employeeID;
				response.collection = entity.EmployeesCollectionByReportsTo;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<EmployeesCollection, Employees> Employees_UpToEmployeesByReportsTo(System.Int32 employeeID)
		{
			jsResponse<EmployeesCollection, Employees> response = new jsResponse<EmployeesCollection, Employees>();

			try
			{
				Employees entity = new Employees();
				entity.EmployeeID = employeeID;
				response.entity = entity.UpToEmployeesByReportsTo;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<TerritoriesCollection, Territories> Employees_UpToTerritoriesCollection(System.Int32 employeeID)
		{
			jsResponse<TerritoriesCollection, Territories> response = new jsResponse<TerritoriesCollection, Territories>();

			try
			{
				Employees entity = new Employees();
				entity.EmployeeID = employeeID;
				response.collection = entity.UpToTerritoriesCollection;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories> Employees_EmployeeTerritoriesCollectionByEmployeeID(System.Int32 employeeID)
		{
			jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories> response = new jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories>();

			try
			{
				Employees entity = new Employees();
				entity.EmployeeID = employeeID;
				response.collection = entity.EmployeeTerritoriesCollectionByEmployeeID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<OrdersCollection, Orders> Employees_OrdersCollectionByEmployeeID(System.Int32 employeeID)
		{
			jsResponse<OrdersCollection, Orders> response = new jsResponse<OrdersCollection, Orders>();

			try
			{
				Employees entity = new Employees();
				entity.EmployeeID = employeeID;
				response.collection = entity.OrdersCollectionByEmployeeID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
				
		
		#endregion
		
		#region IEmployeeTerritories Members
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]	
		public jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories> EmployeeTerritoriesCollection_LoadAll()
		{
			jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories> response = new jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories>();

			try
			{
				EmployeeTerritoriesCollection collection = new EmployeeTerritoriesCollection();
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
		public jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories> EmployeeTerritoriesCollection_Save(EmployeeTerritoriesCollection collection)
		{
			jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories> response = new jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories>();

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
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
		public jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories> EmployeeTerritories_LoadByPrimaryKey(System.Int32 employeeID, System.String territoryID)
		{
			jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories> response = new jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories>();

			try
			{
				EmployeeTerritories entity = new EmployeeTerritories();
				if (entity.LoadByPrimaryKey(employeeID, territoryID))
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
		public jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories> EmployeeTerritories_Save(EmployeeTerritories entity)
		{
			jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories> response = new jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories>();

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
		
		// Hierarchical Data Access Methods Start Here ...
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
		public jsResponse<EmployeesCollection, Employees> EmployeeTerritories_UpToEmployeesByEmployeeID(System.Int32 employeeID, System.String territoryID)
		{
			jsResponse<EmployeesCollection, Employees> response = new jsResponse<EmployeesCollection, Employees>();

			try
			{
				EmployeeTerritories entity = new EmployeeTerritories();
				entity.EmployeeID = employeeID;
				entity.TerritoryID = territoryID;
				response.entity = entity.UpToEmployeesByEmployeeID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
		public jsResponse<TerritoriesCollection, Territories> EmployeeTerritories_UpToTerritoriesByTerritoryID(System.Int32 employeeID, System.String territoryID)
		{
			jsResponse<TerritoriesCollection, Territories> response = new jsResponse<TerritoriesCollection, Territories>();

			try
			{
				EmployeeTerritories entity = new EmployeeTerritories();
				entity.EmployeeID = employeeID;
				entity.TerritoryID = territoryID;
				response.entity = entity.UpToTerritoriesByTerritoryID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
				
		
		#endregion
		
		#region IOrderDetails Members
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]	
		public jsResponse<OrderDetailsCollection, OrderDetails> OrderDetailsCollection_LoadAll()
		{
			jsResponse<OrderDetailsCollection, OrderDetails> response = new jsResponse<OrderDetailsCollection, OrderDetails>();

			try
			{
				OrderDetailsCollection collection = new OrderDetailsCollection();
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
		public jsResponse<OrderDetailsCollection, OrderDetails> OrderDetailsCollection_Save(OrderDetailsCollection collection)
		{
			jsResponse<OrderDetailsCollection, OrderDetails> response = new jsResponse<OrderDetailsCollection, OrderDetails>();

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
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
		public jsResponse<OrderDetailsCollection, OrderDetails> OrderDetails_LoadByPrimaryKey(System.Int32 orderID, System.Int32 productID)
		{
			jsResponse<OrderDetailsCollection, OrderDetails> response = new jsResponse<OrderDetailsCollection, OrderDetails>();

			try
			{
				OrderDetails entity = new OrderDetails();
				if (entity.LoadByPrimaryKey(orderID, productID))
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
		public jsResponse<OrderDetailsCollection, OrderDetails> OrderDetails_Save(OrderDetails entity)
		{
			jsResponse<OrderDetailsCollection, OrderDetails> response = new jsResponse<OrderDetailsCollection, OrderDetails>();

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
		
		// Hierarchical Data Access Methods Start Here ...
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
		public jsResponse<OrdersCollection, Orders> OrderDetails_UpToOrdersByOrderID(System.Int32 orderID, System.Int32 productID)
		{
			jsResponse<OrdersCollection, Orders> response = new jsResponse<OrdersCollection, Orders>();

			try
			{
				OrderDetails entity = new OrderDetails();
				entity.OrderID = orderID;
				entity.ProductID = productID;
				response.entity = entity.UpToOrdersByOrderID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest)]
		public jsResponse<ProductsCollection, Products> OrderDetails_UpToProductsByProductID(System.Int32 orderID, System.Int32 productID)
		{
			jsResponse<ProductsCollection, Products> response = new jsResponse<ProductsCollection, Products>();

			try
			{
				OrderDetails entity = new OrderDetails();
				entity.OrderID = orderID;
				entity.ProductID = productID;
				response.entity = entity.UpToProductsByProductID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
				
		
		#endregion
		
		#region IOrders Members
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]	
		public jsResponse<OrdersCollection, Orders> OrdersCollection_LoadAll()
		{
			jsResponse<OrdersCollection, Orders> response = new jsResponse<OrdersCollection, Orders>();

			try
			{
				OrdersCollection collection = new OrdersCollection();
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
		public jsResponse<OrdersCollection, Orders> OrdersCollection_Save(OrdersCollection collection)
		{
			jsResponse<OrdersCollection, Orders> response = new jsResponse<OrdersCollection, Orders>();

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
		public jsResponse<OrdersCollection, Orders> Orders_LoadByPrimaryKey(System.Int32 orderID)
		{
			jsResponse<OrdersCollection, Orders> response = new jsResponse<OrdersCollection, Orders>();

			try
			{
				Orders entity = new Orders();
				if (entity.LoadByPrimaryKey(orderID))
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
		public jsResponse<OrdersCollection, Orders> Orders_Save(Orders entity)
		{
			jsResponse<OrdersCollection, Orders> response = new jsResponse<OrdersCollection, Orders>();

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
		
		// Hierarchical Data Access Methods Start Here ...
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<ProductsCollection, Products> Orders_UpToProductsCollection(System.Int32 orderID)
		{
			jsResponse<ProductsCollection, Products> response = new jsResponse<ProductsCollection, Products>();

			try
			{
				Orders entity = new Orders();
				entity.OrderID = orderID;
				response.collection = entity.UpToProductsCollection;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<OrderDetailsCollection, OrderDetails> Orders_OrderDetailsCollectionByOrderID(System.Int32 orderID)
		{
			jsResponse<OrderDetailsCollection, OrderDetails> response = new jsResponse<OrderDetailsCollection, OrderDetails>();

			try
			{
				Orders entity = new Orders();
				entity.OrderID = orderID;
				response.collection = entity.OrderDetailsCollectionByOrderID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<CustomersCollection, Customers> Orders_UpToCustomersByCustomerID(System.Int32 orderID)
		{
			jsResponse<CustomersCollection, Customers> response = new jsResponse<CustomersCollection, Customers>();

			try
			{
				Orders entity = new Orders();
				entity.OrderID = orderID;
				response.entity = entity.UpToCustomersByCustomerID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<EmployeesCollection, Employees> Orders_UpToEmployeesByEmployeeID(System.Int32 orderID)
		{
			jsResponse<EmployeesCollection, Employees> response = new jsResponse<EmployeesCollection, Employees>();

			try
			{
				Orders entity = new Orders();
				entity.OrderID = orderID;
				response.entity = entity.UpToEmployeesByEmployeeID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<ShippersCollection, Shippers> Orders_UpToShippersByShipVia(System.Int32 orderID)
		{
			jsResponse<ShippersCollection, Shippers> response = new jsResponse<ShippersCollection, Shippers>();

			try
			{
				Orders entity = new Orders();
				entity.OrderID = orderID;
				response.entity = entity.UpToShippersByShipVia;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
				
		
		#endregion
		
		#region IProducts Members
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]	
		public jsResponse<ProductsCollection, Products> ProductsCollection_LoadAll()
		{
			jsResponse<ProductsCollection, Products> response = new jsResponse<ProductsCollection, Products>();

			try
			{
				ProductsCollection collection = new ProductsCollection();
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
		public jsResponse<ProductsCollection, Products> ProductsCollection_Save(ProductsCollection collection)
		{
			jsResponse<ProductsCollection, Products> response = new jsResponse<ProductsCollection, Products>();

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
		public jsResponse<ProductsCollection, Products> Products_LoadByPrimaryKey(System.Int32 productID)
		{
			jsResponse<ProductsCollection, Products> response = new jsResponse<ProductsCollection, Products>();

			try
			{
				Products entity = new Products();
				if (entity.LoadByPrimaryKey(productID))
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
		public jsResponse<ProductsCollection, Products> Products_Save(Products entity)
		{
			jsResponse<ProductsCollection, Products> response = new jsResponse<ProductsCollection, Products>();

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
		
		// Hierarchical Data Access Methods Start Here ...
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<OrdersCollection, Orders> Products_UpToOrdersCollection(System.Int32 productID)
		{
			jsResponse<OrdersCollection, Orders> response = new jsResponse<OrdersCollection, Orders>();

			try
			{
				Products entity = new Products();
				entity.ProductID = productID;
				response.collection = entity.UpToOrdersCollection;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<OrderDetailsCollection, OrderDetails> Products_OrderDetailsCollectionByProductID(System.Int32 productID)
		{
			jsResponse<OrderDetailsCollection, OrderDetails> response = new jsResponse<OrderDetailsCollection, OrderDetails>();

			try
			{
				Products entity = new Products();
				entity.ProductID = productID;
				response.collection = entity.OrderDetailsCollectionByProductID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<CategoriesCollection, Categories> Products_UpToCategoriesByCategoryID(System.Int32 productID)
		{
			jsResponse<CategoriesCollection, Categories> response = new jsResponse<CategoriesCollection, Categories>();

			try
			{
				Products entity = new Products();
				entity.ProductID = productID;
				response.entity = entity.UpToCategoriesByCategoryID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<SuppliersCollection, Suppliers> Products_UpToSuppliersBySupplierID(System.Int32 productID)
		{
			jsResponse<SuppliersCollection, Suppliers> response = new jsResponse<SuppliersCollection, Suppliers>();

			try
			{
				Products entity = new Products();
				entity.ProductID = productID;
				response.entity = entity.UpToSuppliersBySupplierID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
				
		
		#endregion
		
		#region IRegion Members
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]	
		public jsResponse<RegionCollection, Region> RegionCollection_LoadAll()
		{
			jsResponse<RegionCollection, Region> response = new jsResponse<RegionCollection, Region>();

			try
			{
				RegionCollection collection = new RegionCollection();
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
		public jsResponse<RegionCollection, Region> RegionCollection_Save(RegionCollection collection)
		{
			jsResponse<RegionCollection, Region> response = new jsResponse<RegionCollection, Region>();

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
		public jsResponse<RegionCollection, Region> Region_LoadByPrimaryKey(System.Int32 regionID)
		{
			jsResponse<RegionCollection, Region> response = new jsResponse<RegionCollection, Region>();

			try
			{
				Region entity = new Region();
				if (entity.LoadByPrimaryKey(regionID))
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
		public jsResponse<RegionCollection, Region> Region_Save(Region entity)
		{
			jsResponse<RegionCollection, Region> response = new jsResponse<RegionCollection, Region>();

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
		
		// Hierarchical Data Access Methods Start Here ...
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<TerritoriesCollection, Territories> Region_TerritoriesCollectionByRegionID(System.Int32 regionID)
		{
			jsResponse<TerritoriesCollection, Territories> response = new jsResponse<TerritoriesCollection, Territories>();

			try
			{
				Region entity = new Region();
				entity.RegionID = regionID;
				response.collection = entity.TerritoriesCollectionByRegionID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
				
		
		#endregion
		
		#region IShippers Members
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]	
		public jsResponse<ShippersCollection, Shippers> ShippersCollection_LoadAll()
		{
			jsResponse<ShippersCollection, Shippers> response = new jsResponse<ShippersCollection, Shippers>();

			try
			{
				ShippersCollection collection = new ShippersCollection();
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
		public jsResponse<ShippersCollection, Shippers> ShippersCollection_Save(ShippersCollection collection)
		{
			jsResponse<ShippersCollection, Shippers> response = new jsResponse<ShippersCollection, Shippers>();

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
		public jsResponse<ShippersCollection, Shippers> Shippers_LoadByPrimaryKey(System.Int32 shipperID)
		{
			jsResponse<ShippersCollection, Shippers> response = new jsResponse<ShippersCollection, Shippers>();

			try
			{
				Shippers entity = new Shippers();
				if (entity.LoadByPrimaryKey(shipperID))
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
		public jsResponse<ShippersCollection, Shippers> Shippers_Save(Shippers entity)
		{
			jsResponse<ShippersCollection, Shippers> response = new jsResponse<ShippersCollection, Shippers>();

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
		
		// Hierarchical Data Access Methods Start Here ...
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<OrdersCollection, Orders> Shippers_OrdersCollectionByShipVia(System.Int32 shipperID)
		{
			jsResponse<OrdersCollection, Orders> response = new jsResponse<OrdersCollection, Orders>();

			try
			{
				Shippers entity = new Shippers();
				entity.ShipperID = shipperID;
				response.collection = entity.OrdersCollectionByShipVia;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
				
		
		#endregion
		
		#region ISuppliers Members
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]	
		public jsResponse<SuppliersCollection, Suppliers> SuppliersCollection_LoadAll()
		{
			jsResponse<SuppliersCollection, Suppliers> response = new jsResponse<SuppliersCollection, Suppliers>();

			try
			{
				SuppliersCollection collection = new SuppliersCollection();
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
		public jsResponse<SuppliersCollection, Suppliers> SuppliersCollection_Save(SuppliersCollection collection)
		{
			jsResponse<SuppliersCollection, Suppliers> response = new jsResponse<SuppliersCollection, Suppliers>();

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
		public jsResponse<SuppliersCollection, Suppliers> Suppliers_LoadByPrimaryKey(System.Int32 supplierID)
		{
			jsResponse<SuppliersCollection, Suppliers> response = new jsResponse<SuppliersCollection, Suppliers>();

			try
			{
				Suppliers entity = new Suppliers();
				if (entity.LoadByPrimaryKey(supplierID))
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
		public jsResponse<SuppliersCollection, Suppliers> Suppliers_Save(Suppliers entity)
		{
			jsResponse<SuppliersCollection, Suppliers> response = new jsResponse<SuppliersCollection, Suppliers>();

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
		
		// Hierarchical Data Access Methods Start Here ...
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<ProductsCollection, Products> Suppliers_ProductsCollectionBySupplierID(System.Int32 supplierID)
		{
			jsResponse<ProductsCollection, Products> response = new jsResponse<ProductsCollection, Products>();

			try
			{
				Suppliers entity = new Suppliers();
				entity.SupplierID = supplierID;
				response.collection = entity.ProductsCollectionBySupplierID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
				
		
		#endregion
		
		#region ITerritories Members
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]	
		public jsResponse<TerritoriesCollection, Territories> TerritoriesCollection_LoadAll()
		{
			jsResponse<TerritoriesCollection, Territories> response = new jsResponse<TerritoriesCollection, Territories>();

			try
			{
				TerritoriesCollection collection = new TerritoriesCollection();
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
		public jsResponse<TerritoriesCollection, Territories> TerritoriesCollection_Save(TerritoriesCollection collection)
		{
			jsResponse<TerritoriesCollection, Territories> response = new jsResponse<TerritoriesCollection, Territories>();

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
		public jsResponse<TerritoriesCollection, Territories> Territories_LoadByPrimaryKey(System.String territoryID)
		{
			jsResponse<TerritoriesCollection, Territories> response = new jsResponse<TerritoriesCollection, Territories>();

			try
			{
				Territories entity = new Territories();
				if (entity.LoadByPrimaryKey(territoryID))
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
		public jsResponse<TerritoriesCollection, Territories> Territories_Save(Territories entity)
		{
			jsResponse<TerritoriesCollection, Territories> response = new jsResponse<TerritoriesCollection, Territories>();

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
		
		// Hierarchical Data Access Methods Start Here ...
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<EmployeesCollection, Employees> Territories_UpToEmployeesCollection(System.String territoryID)
		{
			jsResponse<EmployeesCollection, Employees> response = new jsResponse<EmployeesCollection, Employees>();

			try
			{
				Territories entity = new Territories();
				entity.TerritoryID = territoryID;
				response.collection = entity.UpToEmployeesCollection;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories> Territories_EmployeeTerritoriesCollectionByTerritoryID(System.String territoryID)
		{
			jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories> response = new jsResponse<EmployeeTerritoriesCollection, EmployeeTerritories>();

			try
			{
				Territories entity = new Territories();
				entity.TerritoryID = territoryID;
				response.collection = entity.EmployeeTerritoriesCollectionByTerritoryID;
			}
			catch (Exception ex)
			{
				response.exception = ex.Message;
			}

			return response;		
		}
		
		[WebInvoke(ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
		public jsResponse<RegionCollection, Region> Territories_UpToRegionByRegionID(System.String territoryID)
		{
			jsResponse<RegionCollection, Region> response = new jsResponse<RegionCollection, Region>();

			try
			{
				Territories entity = new Territories();
				entity.TerritoryID = territoryID;
				response.entity = entity.UpToRegionByRegionID;
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
