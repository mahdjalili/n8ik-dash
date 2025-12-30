# DeploymentCreateSchema


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [optional] [default to undefined]
**cpu** | **number** | CPU in kubernetes millicores | [optional] [default to 250]
**memory** | **number** | Memory in MB | [optional] [default to 512]
**deployment_config** | [**N8ndeploymentSchema**](N8ndeploymentSchema.md) | Configuration settings for the deployment | [default to undefined]

## Example

```typescript
import { DeploymentCreateSchema } from './api';

const instance: DeploymentCreateSchema = {
    name,
    cpu,
    memory,
    deployment_config,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
