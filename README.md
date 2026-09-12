# FlashFire, a job salary prediction tool for data science roles

# How to access the website
Live link: https://flashfire.onrender.com/
Because of Render's free tier limitations, if the website has been inactive for > 15 minutes, web services will spin down. Please allow 30-60s for the server to restart on its own

## Frontend
FlashFire is built on a React and Next.js front end ensuring the cleanliness and reusability of code as well as allowing for easy state
management of components. TypeScript ensures any compile-time type error is caught, and Tailwind CSS is chosen to simplify the total size
of the full stack web application by allowing class names to be used for styling rather than full CSS files as well as keeping code clean for the developer.

## Backend
The backend is made of two parts:
* API layer
  The API layer connecting the frontend and backend is created using FastAPI, a lightweight backend framework. It was chosen over Django
  as this app only needed a way to bridge Next.js to the ML model without complicated setups, and it did not have a database nor cloud requiring
  Django's out of the box features. In other words, the lack of unneeded features speed up loading times of the site
* Machine learning model
  The machine learning model that predicts salaries based on inputs is trained using a Kaggle dataset called **Data Science Job & Salary Prediction (Glassdoor)**. Here is the link for downloading it: https://www.kaggle.com/code/fahadrehman07/data-science-job-salary-prediction-glassdoor/notebook.
  We used a two-output linear regression model to output the salary as a range. Because of its small size (741 data points after processing and filtering out unknowns), there may be great variances in the prediction of salaries: RMSE = 27.96 for min salary, 41.51 for max salary, R^2 score = 0.220 for min, 0.196 for max.
