def process_job_title(title):
    """
    Processes job title into a format
    the machine learning model understands
    :param title:
    :return:
    """
    lower_title = title.lower()
    is_senior = "senior" in lower_title
    return {
        "data_scientist": int(not is_senior and "data scientist" in lower_title),
        "data_engineer": int(not is_senior and "data engineer" in lower_title),
        "data_analyst": int(not is_senior and "data analyst" in lower_title),
        "senior_data_scientist": int(is_senior and "data scientist" in lower_title),
        "senior_data_engineer": int(is_senior and "data engineer" in lower_title)
    }

def process_job_skills(skills):
    """
    Processes job skills into a format
    the machine learning model understands
    :param skills:
    :return:
    """
    return {
        "python_yn": int("Python" in skills),
        "R_yn": int("R" in skills),
        "spark": int("Spark" in skills),
        "aws": int("AWS" in skills),
        "excel": int("Excel" in skills)
    }