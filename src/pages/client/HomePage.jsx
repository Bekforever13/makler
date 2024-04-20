import { useEffect, useState } from "react";
import Container from "../../components/shared/Container";
import CardItem from "../../components/client/CardItem";
import { useGetAllApartmentsQuery } from "../../store/index.api";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  IconButton,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { setHomePage } from "../../store/slices/apartment.slice";

const HomePage = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState("");
  const [apartments, setApartments] = useState(null);
  const { filters, homePage } = useSelector((s) => s.apartments);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const lang = localStorage.getItem("makler_lang") || "ru";

  const { data, isLoading } = useGetAllApartmentsQuery({
    ...filters,
    page: homePage,
    limit: 20,
    lan: lang,
    price: sort !== "" && sort,
  });

  const decrementPage = () => dispatch(setHomePage(homePage - 1));
  const incrementPage = () => dispatch(setHomePage(homePage + 1));

  useEffect(() => {
    if (data?.data) {
      setTotalPages(Math.ceil(data?.total / 20));
    }
  }, [data?.data]);

  useEffect(() => {
    if (data) {
      setApartments(data.data);
    }
  }, [data, sort]);

  return (
    <Container>
      <div
        className='flex items-center justify-between py-10 flex-wrap'
        id='heading-home'
      >
        <h1 className='text-[20px] text-gray-800 font-semibold my-3'>
          {t("hero_title")}
        </h1>
        <div>
          <Select
            style={{ background: "white", fontWeight: 500 }}
            value={sort}
            label={t("sort")}
            onChange={(e) => setSort(e)}
          >
            <Option value=''>{t("select")}</Option>
            <Option value='asc'>{t("cheap")}</Option>
            <Option value='desc'>{t("expensive")}</Option>
          </Select>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        {/* loading spinner */}
        {isLoading && (
          <div className='grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible'>
            <AiOutlineLoading className='animate-spin' />
          </div>
        )}
        {/* show data */}
        {totalPages > 0 ? (
          <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 gap-4'>
            {apartments?.map((el) => (
              <CardItem key={el.id} item={el} />
            ))}
          </div>
        ) : (
          <div className='p-10 text-2xl'>{t("apartments_not_found")}</div>
        )}
        {/* PAGINATION */}
        {totalPages > 0 && (
          <div className='flex items-center gap-8 p-10'>
            <IconButton
              size='sm'
              style={{ background: "white", fontWeight: 500 }}
              variant='outlined'
              onClick={decrementPage}
              disabled={homePage === 1}
            >
              <FaArrowLeft strokeWidth={2} className='h-4 w-4' />
            </IconButton>
            <Typography color='gray' className='font-normal'>
              {t("page")} <strong className='text-gray-900'>{homePage}</strong>{" "}
              / <strong className='text-gray-900'>{totalPages}</strong>
            </Typography>
            <IconButton
              size='sm'
              style={{ background: "white", fontWeight: 500 }}
              variant='outlined'
              onClick={incrementPage}
              disabled={homePage === totalPages}
            >
              <FaArrowRight strokeWidth={2} className='h-4 w-4' />
            </IconButton>
          </div>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
