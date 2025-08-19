import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getConfig, postConfig } from "./store/slices/config/thunks";
import { ConfigData } from "./views/home/components/ConfigData";
import { Navbar } from "./views/home/components/Navbar";


export const ConfigApp = () => {
    const dispatch = useDispatch()
    const {config, isLoading, modified} = useSelector( state => state.config)
    useEffect(() => {
      dispatch(getConfig())
    }, [])

    const saveConfig= () => {
      dispatch(postConfig(config)) 
    }
    
  return (
    <div className="container">
        <Navbar/>
        <ConfigData data={config} loading={isLoading} error={""} modified={modified} saveConfig={saveConfig} />
    </div>
  )
}
