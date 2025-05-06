import React, { useState } from 'react'

function AdminCard({id,exp,submitHandler,index}) {
    const [tempId,settempId] = useState(id)
    const [tempExp,settempExp] = useState(exp)
    const idHandler = (idparam) => {
        settempId(idparam)
    }
    const expHandler = (expparam) => {
        settempExp(expparam)
    }
  return (
    <>
    <input type="number" value={tempId} onChange={(e)=>idHandler(e.target.value)} />
    <input type='date' value={tempExp} onChange={(e)=>expHandler(e.target.value)} />
    <input type="submit" value='Submit' onClick={()=>submitHandler(id,tempId,tempExp,index)}  /><br/>
    </>
  )
}

export default AdminCard