# DeploymentsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createItemApiN8ikV1DeploymentsPost**](#createitemapin8ikv1deploymentspost) | **POST** /api/n8ik/v1/deployments | Create Item|
|[**deleteItemApiN8ikV1DeploymentsUidDelete**](#deleteitemapin8ikv1deploymentsuiddelete) | **DELETE** /api/n8ik/v1/deployments/{uid} | Delete Item|
|[**listItemsApiN8ikV1DeploymentsGet**](#listitemsapin8ikv1deploymentsget) | **GET** /api/n8ik/v1/deployments | List Items|
|[**retrieveItemApiN8ikV1DeploymentsUidGet**](#retrieveitemapin8ikv1deploymentsuidget) | **GET** /api/n8ik/v1/deployments/{uid} | Retrieve Item|
|[**updateItemApiN8ikV1DeploymentsUidPatch**](#updateitemapin8ikv1deploymentsuidpatch) | **PATCH** /api/n8ik/v1/deployments/{uid} | Update Item|

# **createItemApiN8ikV1DeploymentsPost**
> DeploymentSchema createItemApiN8ikV1DeploymentsPost(deploymentCreateSchema)


### Example

```typescript
import {
    DeploymentsApi,
    Configuration,
    DeploymentCreateSchema
} from './api';

const configuration = new Configuration();
const apiInstance = new DeploymentsApi(configuration);

let deploymentCreateSchema: DeploymentCreateSchema; //

const { status, data } = await apiInstance.createItemApiN8ikV1DeploymentsPost(
    deploymentCreateSchema
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **deploymentCreateSchema** | **DeploymentCreateSchema**|  | |


### Return type

**DeploymentSchema**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteItemApiN8ikV1DeploymentsUidDelete**
> DeploymentSchema deleteItemApiN8ikV1DeploymentsUidDelete()

Delete the item for the USSO routes.  Args:     request: The request.     uid: The UID of the item.  Returns:     Item.

### Example

```typescript
import {
    DeploymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DeploymentsApi(configuration);

let uid: string; // (default to undefined)

const { status, data } = await apiInstance.deleteItemApiN8ikV1DeploymentsUidDelete(
    uid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **uid** | [**string**] |  | defaults to undefined|


### Return type

**DeploymentSchema**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listItemsApiN8ikV1DeploymentsGet**
> PaginatedResponseDeploymentSchema listItemsApiN8ikV1DeploymentsGet()

List items endpoint handler.  Args:     request: FastAPI request object.     offset: Starting offset for pagination.     limit: Maximum number of items to return.     created_at_from: Optional start date filter.     created_at_to: Optional end date filter.  Returns:     PaginatedResponse with items and metadata.

### Example

```typescript
import {
    DeploymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DeploymentsApi(configuration);

let offset: number; // (optional) (default to 0)
let limit: number; // (optional) (default to 10)
let createdAtFrom: string; // (optional) (default to undefined)
let createdAtTo: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.listItemsApiN8ikV1DeploymentsGet(
    offset,
    limit,
    createdAtFrom,
    createdAtTo
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **offset** | [**number**] |  | (optional) defaults to 0|
| **limit** | [**number**] |  | (optional) defaults to 10|
| **createdAtFrom** | [**string**] |  | (optional) defaults to undefined|
| **createdAtTo** | [**string**] |  | (optional) defaults to undefined|


### Return type

**PaginatedResponseDeploymentSchema**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **retrieveItemApiN8ikV1DeploymentsUidGet**
> DeploymentSchema retrieveItemApiN8ikV1DeploymentsUidGet()

Retrieve the item for the USSO routes.  Args:     request: The request.     uid: The UID of the item.  Returns:     Item.

### Example

```typescript
import {
    DeploymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DeploymentsApi(configuration);

let uid: string; // (default to undefined)

const { status, data } = await apiInstance.retrieveItemApiN8ikV1DeploymentsUidGet(
    uid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **uid** | [**string**] |  | defaults to undefined|


### Return type

**DeploymentSchema**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateItemApiN8ikV1DeploymentsUidPatch**
> DeploymentSchema updateItemApiN8ikV1DeploymentsUidPatch(requestBody)

Update the item for the USSO routes.  Args:     request: The request.     uid: The UID of the item.     data: The data to update the item.  Returns:     Item.

### Example

```typescript
import {
    DeploymentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DeploymentsApi(configuration);

let uid: string; // (default to undefined)
let requestBody: { [key: string]: any; }; //

const { status, data } = await apiInstance.updateItemApiN8ikV1DeploymentsUidPatch(
    uid,
    requestBody
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestBody** | **{ [key: string]: any; }**|  | |
| **uid** | [**string**] |  | defaults to undefined|


### Return type

**DeploymentSchema**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

