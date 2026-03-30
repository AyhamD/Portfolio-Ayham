import React from "react";

export interface ModalProps {
	open: boolean;
	title?: string;
	description?: string;
	children?: React.ReactNode;
	onClose: () => void;
	footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
	open,
	title,
	description,
	children,
	onClose,
	footer,
}) => {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
			<div className="bg-slate-900 border border-slate-700 rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
				{(title || description) && (
					<div className="mb-4">
						{title && (
							<h2 className="text-lg font-semibold text-white mb-1">{title}</h2>
						)}
						{description && (
							<p className="text-slate-300 text-sm">{description}</p>
						)}
					</div>
				)}

				{children && <div className="mb-4 text-slate-200 text-sm">{children}</div>}

				{footer && <div className="flex justify-end gap-2">{footer}</div>}
			</div>

			{/* click outside to close */}
			<button
				type="button"
				aria-label="Close modal backdrop"
				className="absolute inset-0 w-full h-full cursor-default"
				onClick={onClose}
			/>
		</div>
	);
};

export default Modal;

