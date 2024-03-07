export const Dashboard = 'Dashboard';
export const DashboardIcon = 'fas fa-chart-pie';
export const SelectedMenuItem = 'kiktemp-selected-menu';
export const BREADCRUMB_HOME = 'Home > ';
export const BREADCRUMB_HOME_DASHBOARD = 'Home > Dashboard';

// Counts
export const tableRowsPerPage = 10;
export const tokenCheckInterval = 12 * 60 * 60 * 1000;
export const zIndex10000 = 10000;
export const mobileWidth = 420;

// Error Messages
export const error = 'Error !';
export const requiredField = 'This field is required.';
export const enterValidInput = 'Enter a valid input.';
export const somethingWentWrong = 'Something went wrong. Please refresh & Try again.';
export const passwordLength = 'Password must be at least 6 characters long.';
export const passwordMissmatch = 'New password and confirm password entries must be matched.';
export const sessionExpiredTopic = 'Session Expired !';
export const sessionExpiredMessage = 'Your session has expired. Please log in again to continue.';
export const passwordLengthError = 'Please ensure your password is at least 7 characters long.';

// Success Messages
export const accessRequestSuccess = 'Access request has been successfully submitted.';
export const success = 'Success !';
export const signUpSuccess = 'Sign up successful!';

// Patterns
export const emailPattern = '^\\w+([+.]\\w+)*2?@(\\w+)(\\.\\w{2,}|\\.\\w{2,}\\.[\\w.]{2,})$';
export const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
export const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Modal header, content
export const termsOfServiceHeader = 'KIKTEMP - Terms of Service';
export const suspendHeader = 'Confirm User Suspension';
export const unsuspendHeader = 'Confirm User Unsuspension';
export const removeHeader = 'Confirm User Removal';
export const suspendContent = 'To confirm the suspension of this user\'s account and temporarily disable their access to the platform, please enter your password:';
export const unsuspendContent = 'To confirm the unsuspension of this user\'s account and restore their access to the platform, please enter your password:';
export const removeContent = 'To confirm the removal of this user\'s account and permanently delete their account, please enter your password:';
export const removeProjectHeader = 'Confirm Project Removal';
export const removeProjectContent = 'To confirm the removal of this project, please enter your password:';

// URL
export const countryURL = 'https://restcountries.com/v2/all';
export const dashboardRoute = '/dashboard';
export const userProfileRoute = '/user-profile';

// Common Variables
export const sriLankaMask = '999999-99-9999999';
export const foreignMask = '999999-999999999999999';
export const sriLankaSlotChar = 'xx-xxxxxxx';
export const foreignSlotChar = 'xxxxxxxxxxxxxxx';
export const contactSlotChar = '000094-xx-xxxxxxx';
export const disabled = 'disabled';

// Modal widths
export const width40 = '40%';
export const width50 = '50%';

// User Status
export const verified = 'verified';
export const suspended = 'suspended';
export const unsuspended = 'unsuspended';
export const requested = 'requested';
export const removed = 'removed';

//Customer List page strings
export const customerListRoute = '/user-management/customers-of-distributor';
export const customerListHeader = 'Customer List';
export const customerListSubHeader = 'Home > User Management > Customer List';
export const customerListIcon = 'fa-solid fa-users-line';

//User Overview page strings
export const userOverviewRoute = '/user-management/user-overview';
export const userOverviewHeader = 'User Overview';
export const userOverviewSubHeader = 'Home > User Management > User Overview';
export const userOverviewIcon = 'fa-solid fa-user-gear';

//Project Overview page strings
export const projectOverviewRoute = '/project-overview';
export const projectOverviewHeader = 'Project Overview';
export const projectOverviewSubHeader = 'Home > Project Management > Project Overview';
export const projectOverviewIcon = 'fa-solid fa-charging-station';


//View Report page strings
export const viewReportRoute = '/report';
export const viewReportHeader = 'View Report';
export const viewReportSubHeader = 'Home > Project Management > View Report';
export const viewReportIcon = 'fa-solid fa-file-pdf';

//Cubicle Overview page strings
export const cubicleOverviewRoute = '/cubicle-overview';
export const cubicleOverviewHeader = 'Cubicle Overview';
export const cubicleOverviewSubHeader = 'Home > Project Management > Cubicle Overview';
export const cubicleOverviewIcon = 'fa-solid fa-cubes';