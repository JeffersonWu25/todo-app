export function EditModal(props) {
    const { value, onChange, handleCancelEdit, handleSubmitEdit, editingIndex } = props

    return (
        <div className="modal-overlay">
            <div className="modal">
                <form onSubmit={(e) => {
                    e.preventDefault()

                    if (!value) return
                    handleSubmitEdit(editingIndex, value)
                }}>
                    <textarea value={value}
                        onChange={(e) => {onChange(e.target.value)}}
                        placeholder="Edit Task" 
                        rows={3}/>
                    <div className="modal-buttons">
                        <button onClick={() => {
                            handleCancelEdit()
                        }}>
                            Cancel
                        </button>
                        <button type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}