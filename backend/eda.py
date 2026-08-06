import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import re

HOURLY_TO_YEARLY_RATIO = 2.08


# Read the CSV files
salaries = pd.read_csv('data_csvs/salaries.csv')
salaries_head = salaries.head()


# First 5 elements
print("head")
print(salaries_head)
print("\n")


# Number of jobs
print("Number of jobs in the dataset")
print(len(salaries))
print("\n")


# Average salary in thousands of dollars of the first 5 jobs
print("average salary of head")
print(salaries_head['avg_salary'])
print("\n")


# Statistical description
print("description")
print(salaries.describe())


# Number of unique job titles
print(salaries['Job Title'].value_counts())
print("\n")


# Number of hourly salaries, convert this to annual rate (in thousand $)
hourly_rate_jobs = salaries[salaries['hourly']==1]
print("Number of salaries represented with an hourly rate")
print(len(hourly_rate_jobs))
print("\n")

salaries['min_salary'] = salaries['min_salary'].astype(float).round(decimals=2)
salaries['max_salary'] = salaries['max_salary'].astype(float).round(decimals=2)

salaries.loc[salaries['hourly']==1, 'min_salary'] *= HOURLY_TO_YEARLY_RATIO
salaries.loc[salaries['hourly']==1, 'max_salary'] *= HOURLY_TO_YEARLY_RATIO
salaries.loc[salaries['hourly']==1, 'avg_salary'] *= HOURLY_TO_YEARLY_RATIO

hourly_rate_jobs = salaries[salaries['hourly']==1]

print("Min salaries of hourly rate jobs")
print(hourly_rate_jobs['min_salary'])
print("\n")

print("Max salaries of hourly rate jobs")
print(hourly_rate_jobs['max_salary'])
print("\n")

print("Average salaries of hourly rate jobs")
print(hourly_rate_jobs['avg_salary'])
print("\n")


# Company size, revenue and type of ownership
print("Company size")
print(salaries['Size'].value_counts())
print('\n')

print("Company revenue")
print(salaries['Revenue'].value_counts())
print('\n')

print("Company ownership")
print(salaries['Type of ownership'].value_counts())
print('\n')


# Industry and sector
print("Sector of the company")
print(salaries['Sector'].value_counts())
print('\n')

print("Industry of the company")
print(salaries['Industry'].value_counts())
print('\n')


# Visualize min, max, avg salaries
"""
Average = (max - min) / 2
Expectations:
Mean minimum < Mean average < Mean maximum
All 3 follow an approximately normal curve
"""
hourly_min = hourly_rate_jobs['min_salary']
hourly_max = hourly_rate_jobs['max_salary']
hourly_avg = hourly_rate_jobs['avg_salary']

min_salary_curve = sns.histplot(hourly_min, kde=True, stat="density", label='Minimum')
avg_salary_curve = sns.histplot(hourly_avg, kde=True, stat="density", label='Average')
max_salary_curve = sns.histplot(hourly_max, kde=True, stat="density", label='Maximum')

plt.xlabel('Salary in k $')
plt.get_current_fig_manager().set_window_title("Salary distribution")
plt.gcf().set_size_inches(11, 7)
plt.legend()
plt.show()

print("Minimums")
print("Mean: " + str(round(hourly_min.mean(), 2)) + "\nStandard deviation: " + str(round(hourly_min.std(), 2)) + "\n")
print("Maximums")
print("Mean: " + str(round(hourly_max.mean(), 2)) + "\nStandard deviation: " + str(round(hourly_max.std(), 2)) + "\n")
print("Averages")
print("Mean: " + str(round(hourly_avg.mean(), 2)) + "\nStandard deviation: " + str(round(hourly_avg.std(), 2)))


# Convert job titles to one-hot encoding
salaries['data_scientist'] = salaries['Job Title'].apply(lambda j: 1 if j == "Data Scientist" else 0)
salaries['data_engineer'] = salaries['Job Title'].apply(lambda j: 1 if j == "Data Engineer" else 0)
salaries['senior_data_scientist'] = salaries['Job Title'].apply(lambda j:
                                                                1 if j == "Senior Data Scientist" else 0)
salaries['data_analyst'] = salaries['Job Title'].apply(lambda j: 1 if j == "Data Analyst" else 0)
salaries['senior_data_engineer'] = salaries['Job Title'].apply(lambda j:
                                                               1 if j == "Senior Data Engineer" else 0)

salaries = salaries.drop('Job Title', axis=1)


# Convert company size to a range
def impute_company_size(size_row):
    """
    Extract numbers from the company size, if unknown, impute median (501-1000)
    Call this method to convert the company size to integer
    """
    if "Unknown" in size_row:
        return [501, 1000]
    else:
        size_range = [int(n) for n in re.findall(r'\d+', size_row)]
        if len(size_range) == 1:
            size_range.append(2 * size_range[0])
        return size_range

salaries[['min_size', 'max_size']] = salaries['Size'].apply(lambda r: pd.Series(impute_company_size(r)))


# Convert revenue to a range, in millions USD
def extract_and_standardize_revenue(mins, maxs, revenue_row):
    """
    Extract numbers from each row and standardize to millions $
    If the revenue is unknown and the sector is not non-profit, impute based on the size, otherwise if the sector is
    non-profit, enter 0 for min and max.
    If there is only one number, impute based on whether it is a minimum or a maximum.
    If it is less than 1M$, impute based on the size.
    Call this method when imputing min and max company revenues
    """

    # Edge case: Revenue unknown
    if revenue_row == "Unknown / Non-Applicable":
        return [round(0.1 * mins, 2), round(0.2 * maxs, 2)]

    # Find integers then convert to int list
    revenue_range = [int(n) for n in re.findall(r'\d+', revenue_row)]
    if "billion" in revenue_row:
        # > 10B
        if len(revenue_range) == 1:
            revenue_range[0] = revenue_range[0] * 1000
            revenue_range.append(2 * revenue_range[0])
        # 500M to 1B
        elif len(revenue_range) == 2 and "million" in revenue_row:
            revenue_range[1] = revenue_range[1] * 1000
        # Every other case containing 'billion', e.g. "1 to 2 B"
        else:
            revenue_range = list(map(lambda n: 1000 * n, revenue_range))
    # < 1M
    elif len(revenue_range) == 1 and "million" in revenue_row:
        revenue_range.insert(0, 0)

    return revenue_range

salaries[['min_revenue', 'max_revenue']] = salaries.apply(lambda r:
                                         pd.Series(extract_and_standardize_revenue(r['min_size'], r['max_size'],
                                                                         r['Revenue'])), axis=1)


# Convert ownership to one-hot encoding
salaries['private_company'] = salaries['Type of ownership'].apply(lambda j:
                                                                  1 if j == "Company - Private" else 0)
salaries['public_company'] = salaries['Type of ownership'].apply(lambda j:
                                                                 1 if j == "Company - Public" else 0)
salaries['nonprofit'] = salaries['Type of ownership'].apply(lambda j:
                                                            1 if j == "Nonprofit Organization" else 0)
salaries['subsidiary_or_business'] = salaries['Type of ownership'].apply(lambda j:
                                                                         1 if j == "Subsidiary or Business Segment"
                                                                         else 0)


# Drop unnecessary columns
salaries = salaries.drop(columns=['avg_salary', 'age', 'same_state', 'hourly',
                       'Salary Estimate', 'Company Name', 'employer_provided', 'Size', 'Revenue', 'Type of ownership',
                                  'Competitors', 'Founded', 'Industry', 'Sector', 'Headquarters',
                                  'Job Description', 'Location', 'Rating'])
salaries = salaries.rename(columns={'company_txt': 'company_name'})


# Export as a new CSV file
salaries.to_csv('./data_csvs/salaries_preprocessed.csv', index=False)
