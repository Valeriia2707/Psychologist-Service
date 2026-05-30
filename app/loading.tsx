import {DNA} from "react-loader-spinner";
import css from "./Home.module.css"

export default function Loading () {
return(
    <div className={css.loaderWrapper}>
        <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        />
    </div>
)
}