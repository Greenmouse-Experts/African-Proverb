import React from "react";
import SearchFormStyles from "../../styles/SearchForm.module.scss";

const SearchForm = () => {
  return (
    <div>
      <form>
        <input type="text" placeholder="Search African Proverbs" />

        <div className={SearchFormStyles["search-form-select"]}>
          <select
            name="ethnic"
            id="ethnic"
            className={SearchFormStyles["ethnic"]}
          >
            <option value="" defaultValue={""}>
              Select All Ethnics
            </option>{" "}
            <option value="Yoruba">Yoruba</option>
            <option value="Igbo">Igbo</option>
            <option value="Hausa">Hausa</option>
          </select>
        </div>

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
