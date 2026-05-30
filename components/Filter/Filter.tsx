import { useState } from "react";
import css from "./Filter.module.css";
import Icon from "../ui/Icon/Icon";

interface FilterProps {
    value: string,
    onChange: (value: string) => void
}

interface Option {
        value: string,
    label: string
}

const sortOptions: Option[] = [
    {value: "title_asc", label: "A to Z"},
    {value: "title_desc", label: "Z to A"},
    {value: "cheaper_price", label: "Less than 10$"},
    {value: "exp_price", label: "Greater than 10$"},
    {value: "popular", label: "Popular"},
    {value: "non_popular", label: "Not popular"},
    {value: "all", label: "Show all"},
]

const Filter = ({value, onChange}: FilterProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const currentOption = sortOptions.find(opt => opt.value === value);

    return(
        <div className={css.dropDownContainer}>
            <div className={css.chooseContainer} onClick={() => setIsOpen(!isOpen)}>
                <p className={css.chosenText} >{currentOption ? currentOption.label : "Choose a filter"}</p>
                <button type="button" className={css.icon}>{ isOpen ? <Icon name="icon-up" width={20} height={20}/> : <Icon name="icon-down" width={20} height={20}/>}</button>
            </div>
            {isOpen && (
                <div className={css.optionList}>
                    {sortOptions.map(opt => {
                        const isActive = opt.value === value
                        return (
                            <button 
                            type="button" 
                            key={opt.value} 
                            className={`${css.optionBtn} ${isActive ? css.activeOpt : ""}`}
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false)
                            }}
                            >
                                {opt.label}
                            </button>
                        )
                        })}
                </div>
            )}
        </div>
    )
}

export default Filter;