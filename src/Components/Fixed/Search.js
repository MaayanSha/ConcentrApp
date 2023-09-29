import "../ResearchHome/home.css"
import { Row } from "reactstrap";

function Search(){
return(
    <Row>
      <div class="topnav">
          <input class="searchbar" type="text" placeholder="Search.."></input>
          <button class="search-button"
          type="submit"/>
      </div>
    </Row>
)
}
export default Search;