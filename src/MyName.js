const MyName = ({value, onValueChange}) => {
    return (
        <div>
            <label>Name: </label>
            <input value={value} onChange={onValueChange}/>
        </div>
    );
};

export default MyName;