export default function KmodalHead(props: { title?: string }) {
    let useTitle = "Modal"
    if (props.title) { useTitle = props.title; }
    return (
        <div>{useTitle}</div>
    )
}