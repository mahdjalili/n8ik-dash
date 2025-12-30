# N8ndeploymentSchema


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**is_enabled** | **boolean** | Indicates whether the deployment is enabled | [optional] [default to true]
**version** | **string** | Version of the deployment in docker format | [optional] [default to 'latest']
**storage** | **number** | Storage in MB | [optional] [default to 500]
**cpu** | **number** | CPU in kubernetes millicores | [optional] [default to 250]
**memory** | **number** | Memory in MB | [optional] [default to 512]

## Example

```typescript
import { N8ndeploymentSchema } from './api';

const instance: N8ndeploymentSchema = {
    is_enabled,
    version,
    storage,
    cpu,
    memory,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
