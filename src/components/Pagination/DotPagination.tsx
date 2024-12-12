import { MdArrowForwardIos } from "react-icons/md";
import ReactPaginate from "react-paginate";

interface PaginationProps {
	onPageChange: (page: number) => void;
	pageCount: number;
	className?: "";
}
const DotPagination = ({ onPageChange, pageCount, className = "", ...props }: PaginationProps) => {
	return (
		<>
			<ReactPaginate
				pageCount={pageCount}
				onPageChange={(e) => onPageChange(e.selected)}
				pageLabelBuilder={(page) => <div className="w-3 h-3 min-w-3 min-h-3"></div>}
				containerClassName=""
				className={`py-2 w-full flex gap-2 items-center justify-end ${className}`}
				pageClassName="rounded-full bg-muted-foreground hover:scale-105"
				activeClassName="!bg-foreground"
				previousClassName=""
				nextClassName=""
				previousLabel={<MdArrowForwardIos className="  rotate-180" />}
				nextLabel={<MdArrowForwardIos className=" " />}
				{...props}
			/>
		</>
	);
};

export default DotPagination;
