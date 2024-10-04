import { reverseProxyApi } from '../../../api/reverseProxyApi'
import { setConfig, startLoadingConfig, setError } from './configSlice'

export const getConfig = () => {
    return async (dispatch) => {
        dispatch(startLoadingConfig())

        const {data} = await reverseProxyApi.get('/config?filter=latest')
        .catch((error) => {
            dispatch(setError(error.message))        
        }
        )

        dispatch(setConfig(data))
        
    }  
}

export const postConfig = (config) => {
    return async (dispatch) => {
        await reverseProxyApi.post('/config',config)
        .then(async (response) => {
            console.log(response)
            await reverseProxyApi.get('/restart')
            .then( (response) => {
                console.log(response)
                window.location.reload();
            })
        })
        .catch(async (err) => {
            dispatch(setError(err.message))            
        })
        
    }  
}

export const restarServer = () => {
    return async (dispatch) => {
        await reverseProxyApi.get("/restart")
        .catch((error) => {
            dispatch(setError(error.message))        
        }
        )
        
    }
}
