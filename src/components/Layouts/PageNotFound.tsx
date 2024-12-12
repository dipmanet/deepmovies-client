import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="text-center py-8">
			<h1 className="text-primary">Oop! Page Not Found</h1>
			<p
				role="button"
				onClick={() => navigate(-1)}
				className="text-accent-6 hover:underline hover:text-accent-8">
				Go back
			</p>
		</div>
	);
};
export default PageNotFound;
