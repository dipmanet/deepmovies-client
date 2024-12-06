import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "#lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90 border border-foreground",
				simple:
					"bg-primary hover:bg-violet-700 text-border hover:text-primary border border-border",
				whitesmoke: "bg-purple-50 hover:bg-violet-700 text-violet-700 hover:text-purple-50 ",
				purple:
					"bg-violet-700 hover:bg-primary text-primary hover:text-violet-700 border border-violet-700",
				destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	icon?: React.ReactNode;
	children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, children, size, icon, ...props }, ref) => {
		return (
			<Button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
				{icon ? icon : null}
				{children}
			</Button>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
