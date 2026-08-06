import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.metrics import r2_score
from pickle import dump

salaries = pd.read_csv('data_csvs/salaries_preprocessed.csv')



# Input: Company info
X = salaries[['data_scientist', 'data_engineer', 'senior_data_scientist',
              'data_analyst', 'senior_data_engineer', 'python_yn', 'R_yn', 'spark',
              'aws', 'excel']]


# Output: min and max salaries
y = salaries[['min_salary', 'max_salary']]


# Train test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25)


# Create and train model
linear_regressor = LinearRegression()
linear_regressor.fit(X_train, y_train)


# Get predictions
predictions = linear_regressor.predict(X_test)


# Evaluate model
sns.histplot((y_test - predictions), kde=True, stat='density')
plt.xlabel('Salary in k $')
plt.get_current_fig_manager().set_window_title("Distribution of errors")
plt.gcf().set_size_inches(11, 7)
plt.show()


sns.regplot(x=y_test.iloc[:, 0], y=predictions[:, 0], label='Min salary')
sns.regplot(x=y_test.iloc[:, 1], y=predictions[:, 1], label='Max salary')
plt.get_current_fig_manager().set_window_title("Scatter plot of min and max salaries")
plt.xlabel("Actual salaries in k $")
plt.ylabel("Predicted salaries in k $")
plt.legend()
plt.show()

# RMSE = sqrt(MSE)
print("RMSE of [min_salary, max_salary]")
root_mse = np.sqrt(mean_squared_error(y_test, predictions, multioutput='raw_values')).tolist()
print(root_mse)

#R^2 score
print("R^2 score of [min_salary, max_salary]")
r_score = r2_score(y_test, predictions, multioutput='raw_values')
print(r_score)

# R score = sqrt(R^2 score)
print("R score of [min_salary, max_salary]")
r_score = np.sqrt(r2_score(y_test, predictions, multioutput='raw_values')).tolist()
print(r_score)


# Export model for backend
with open('model.pkl', 'wb') as f:
    dump(linear_regressor, f)
