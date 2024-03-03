import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import "./Skeleton.list.css";

function SkeletonList({list}){
    return (<>
        { list && list.map((item)=>(
            <div key={item} className='skeleton-item'>
                <Skeleton variant="rectangular" width={210} height={220} />
                <div>
                    <Skeleton width={250} height={80}/>
                    <Skeleton width={450}/>
                    <Skeleton width={450}/>
                    <div className='skeleton-item-action'>
                        <Skeleton variant="rectangular" width={150} height={40} />
                    </div>
                </div>
            </div>
        ))
        }
        
    </>)
}

export default SkeletonList