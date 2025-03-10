'use client';const ProgressionBar = ({ progressAmount }: { progressAmount: number }) => {
	return (
		<div className="progress-bar__wrapper">
			<h1 className="progress-bar__title">{progressAmount}%</h1>
		</div>
	);
};

export default ProgressionBar;
