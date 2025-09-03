import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react"

type Props = {
    title: string
    value?: string
    readOnly?: boolean
    type?: HTMLInputTypeAttribute
    change: (value: string) => void
}

export default function MyInput(props: Props) {
    return (
        <div className="div-input">
            <span>{props.title}:</span>
            <input
                value={props.value}
                readOnly={props.readOnly}
                type={props.type || 'text'}
                onChange={event => props.change(event.target.value)}
            />
        </div>
    )
}