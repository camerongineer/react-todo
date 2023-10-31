const MyName = ({ value, onValueChange }) => {
    return (
        <div>
            <label>Name:&nbsp;</label>
            <input value={value} onChange={onValueChange}/>
        </div>
    );
};

export default MyName;