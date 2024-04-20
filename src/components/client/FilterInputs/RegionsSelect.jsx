import Select from "react-select";
import { useTranslation } from "react-i18next";
import { useGetAllRegionsQuery } from "../../../store/index.api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, setHomePage } from "../../../store/slices/apartment.slice";

const RegionsSelect = () => {
  const lang = localStorage.getItem("makler_lang") || "ru";
  const { data, isSuccess } = useGetAllRegionsQuery({ lan: lang });
  const { t } = useTranslation();
  const [regionOptions, setRegionOptions] = useState([]);
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const { filters } = useSelector((s) => s.apartments);

  const handleSelect = (val) => {
    setValue(val);
    dispatch(setFilters({ ...filters, region_id: val.value }));
    dispatch(setHomePage(1));
  };

  useEffect(() => {
    if (data?.data) {
      const mappedData = data.data.map((el) => ({
        value: el.id,
        label: el.name,
      }));
      setRegionOptions(mappedData);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!Object.keys(filters).length) {
      setValue(null);
    }
  }, [filters]);

  return (
    <Select
      placeholder={t("selectRegion")}
      value={value}
      onChange={(e) => handleSelect(e)}
      components={{
        IndicatorSeparator: () => null,
      }}
      options={regionOptions}
      className='w-full rounded-lg'
      classNamePrefix='select'
    />
  );
};

export default RegionsSelect;
