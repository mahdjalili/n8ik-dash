# DeploymentSchema


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**uid** | **string** | Unique identifier for the entity | [optional] [default to undefined]
**created_at** | **string** | Date and time the entity was created | [optional] [default to undefined]
**updated_at** | **string** | Date and time the entity was last updated | [optional] [default to undefined]
**is_deleted** | **boolean** | Whether the entity has been deleted | [optional] [default to false]
**meta_data** | **{ [key: string]: any; }** |  | [optional] [default to undefined]
**user_id** | **string** |  | [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**cpu** | **number** | CPU in kubernetes millicores | [optional] [default to 250]
**memory** | **number** | Memory in MB | [optional] [default to 512]
**deployment_config** | [**N8ndeploymentSchema**](N8ndeploymentSchema.md) | Configuration settings for the deployment | [default to undefined]
**uri** | **string** | URI of the deployment | [default to undefined]
**is_paused** | **boolean** | Indicates whether the deployment is paused | [optional] [default to false]

## Example

```typescript
import { DeploymentSchema } from './api';

const instance: DeploymentSchema = {
    uid,
    created_at,
    updated_at,
    is_deleted,
    meta_data,
    user_id,
    name,
    cpu,
    memory,
    deployment_config,
    uri,
    is_paused,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
