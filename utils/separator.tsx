'use client'

import React from 'react'


type SeparatorProps = {
    height?: string
    width?: string
}
export default function Separator(props: SeparatorProps) {
    return (
        <div style={{ height: props.height, width: props.width }}>
        </div>
    )
}
