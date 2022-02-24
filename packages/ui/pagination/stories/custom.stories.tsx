import React, { useState } from 'react'
import Pagination from '../src'

export const Custom = () => {
  const [current, updateCurrent] = useState(1)
  return (
    <>
      <h1>自定义组合</h1>
      <div className="pagination-basic__wrap">
        <Pagination
          total={200}
          showTotal={false}
          showJumper
          pageSize={10}
          showPagers={false}
          pageSizeOptions={[10, 20, 50, 100]}
          current={current}
          onChange={(cur) => {
            updateCurrent(cur)
          }}
        />
      </div>
    </>
  )
}