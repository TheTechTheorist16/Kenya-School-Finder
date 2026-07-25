import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

r = requests.get(
    "https://selection.education.go.ke/api/api/v1/map/senior-secondary/subject-combinations",
    params={
        "school-id": "3b730c57-05f1-46a8-b2f0-56a183b46412"
    },
    verify=False
)

print(r.status_code)
print(r.json())