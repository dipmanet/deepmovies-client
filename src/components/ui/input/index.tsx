import * as React from "react";

import { cn } from "#lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ icon, className, type = "text", ...props }, ref) => {
		return (
			<div className="w-full flex relative items-center">
				{icon ? <div className="absolute left-3">{icon}</div> : null}
				<input
					type={type}
					className={cn(
						"flex h-11 w-full rounded-lg border border-input bg-background pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
						icon ? "pl-10" : "pl-3",
						className ?? ""
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
