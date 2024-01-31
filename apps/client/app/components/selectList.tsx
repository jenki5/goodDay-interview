"use client"
import React from 'react'

interface SelectProps {
    list: KeyValuePair[];
    selected: string;
}

export default function SelectList({list, selected = ''}: SelectProps) {
    const handleSort = (value: string) => {
        console.log(value)
        window.location.href = `http://localhost:4200/purchase-orders?sort=${value}`
    }


    
  return (
    //@ts-ignore
    <select defaultValue={selected} onChange={(e) => handleSort(e.nativeEvent.target?.value)}>
        {list.map(item => (
            <option key={item.key} value={item.key}>{item.value}</option>
        ))}
    </select>
  )
}
