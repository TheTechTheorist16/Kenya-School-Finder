import requests

url = "https://selection.education.go.ke/api/api/v1/map/senior-secondary/subject-combinations"

response = requests.get(url, verify=False)

print(response.status_code)
print(response.text[:1000])