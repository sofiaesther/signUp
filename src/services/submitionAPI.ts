export const postSubscriptionForm = async ({ data }: { data: Record<string, string> }) => {
	try {
		// Simulating a delay like a real API request
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Retrieve existing subscriptions from localStorage
		const existingSubscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');

		// Add new form submission
		const updatedSubscriptions = [...existingSubscriptions, data];

		localStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions));

		console.log('✅ Form submitted successfully:', data);
		return { success: true, message: 'Subscription successful!' };
	} catch (error) {
		console.error('Error submitting form:', error);
		return { success: false, message: 'An error occurred while submitting.' };
	}
};
