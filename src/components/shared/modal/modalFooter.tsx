export default function KmodalFoot(props: { closeModal: Function }) {
    return (
        <div className=" flex">
            <div className=" flex-grow"></div>
            <div>
                <button onClick={() => { props.closeModal() }} className=" btn-cancel p-2">Close</button>
            </div>
        </div>
    )
}