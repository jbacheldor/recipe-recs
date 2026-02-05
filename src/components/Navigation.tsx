import { NavLink } from "react-router";

const style = {
    div: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    id: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%'
    }

}


const Navigation:React.FC = () => {

    return (
        <div style={style.div}>
        <nav id="nav" style={style.id}>
            <NavLink to="/" end>
                Home
            </NavLink>
            <NavLink to="/add" end>
                Add Recipe
            </NavLink>
            <NavLink to="/search">Search Recipes</NavLink>
        </nav>
        </div>
    )
}

export default Navigation;