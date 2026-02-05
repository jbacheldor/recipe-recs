import DropDown from "../components/DropDown"


// const style = {
    
// }

const SearchPage:React.FC = () => {
    // const time = []
    // const ingredients = []
    // const allergy = []
    // const tags = []

    return (
        <>
        <div>
            Search
            <input placeholder="eeee"/>
            <button></button>
        </div>
        <div>
            <button>tags</button>
            <DropDown options={['rabbit', 'eggs', 'cow', 'wheeee']} selected={[]}/>
        </div>
        <hr/>
        <div>
            data here
        </div>
        <div>
            pagination here
        </div>
        </>
    )
}

export default SearchPage;