import Reports from "../reports/Reports";
import { BalanceSheetResponse } from "../table/Table";
import withLoading from "../../hocs/withLoading";
import withErrorHandling from '../../hocs/withErrorHandling';
import withNoData from "../../hocs/withNoData";
import useFetch from "../../hocs/useFetch";
import { config } from "../../config";

const ReportsWithLoading = withLoading(Reports);
const ReportswithErrorHandling = withErrorHandling(ReportsWithLoading);
const ReportswithNoData = withNoData(ReportswithErrorHandling);

function BalanceSheetTable() {
  const { api } = config;
  const { data, isLoading, error} = useFetch<BalanceSheetResponse[]>(api);
  return (
    <ReportswithNoData isLoading={isLoading} error={error}  data={data as BalanceSheetResponse[] } />
  );
}

export default BalanceSheetTable;
