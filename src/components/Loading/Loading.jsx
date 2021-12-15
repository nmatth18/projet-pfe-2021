import React from "react"
import ReactLoading from 'react-loading'

const BigLoader = () =>  {
    return (
        <div className='loadingCenter'>
             <ReactLoading type={"spin"} color={"#006F91"} height={200} width={200} />
        </div>
    )
}

const SmallLoader = () =>  {
    return (
        <div className='loadingCenter'>
             <ReactLoading type={"spin"} color={"#006F91"} height={31} width={31} />
        </div>
    )
}

export const Loader = {
    BigLoader,
    SmallLoader
}
