import requests
import json
import time

BASE_URL = "https://selection.education.go.ke/api/api/v1"

regions = {
    "Nairobi": {
        "Nairobi": ["Westlands","Langata","Kasarani","Embakasi","Dagoretti","Kibra","Njiru","Makadara","Kamukunji","Starehe","Mathare"]
    },
    "Central": {
        "Kiambu":["Thika East","Thika West","Gatundu South","Gatundu North","Ruiru","Githunguri","Kiambu","Kiambaa","Kabete","Kikuyu","Juja","Limuru","Lari","Githurai","Ndeiya"],
        "Murang'a":["Kangema","Mathioya","Kahuro","Kigumo","Ithanga/Kakuzi","Kandara","Gatanga","Murang'a South","Murang'a East","Muranga East"],
        "Nyeri":["Tetu","Nyeri Central","Kieni West","Kieni East","Mathira West","Mathira East","Nyeri South","Mukurwe-ini","Mukurweini"],
        "Kirinyaga":["Kirinyaga Central","Mwea East","Mwea West","Kirinyaga East","Kirinyaga West"],
        "Nyandarua":["South Kinangop","North Kinangop","Kipipiri","Mirangine","Nyandarua West","Nyandarua Central","Nyandarua North","Gathanji","Aberdare","Wanjohi"]
    },
    "Coast": {
        "Mombasa":["Nyali","Changamwe","Likoni","Jomvu","Mombasa","Kisauni"],
        "Kwale":["Msambweni","Kinango","Samburu","Shimba Hills","Matuga","Lunga Lunga","Kwale"],
        "Kilifi":["Kaloleni","Rabai","Ganze","Malindi","Magarini","Chonyi","Kilifi South","Kauma","Kilifi North","Kilifi"],
        "Tana River":["Tana River","Tana Delta","Galedyertu","Bangale","Tana North","Galledyertu"],
        "Lamu":["Lamu East","Lamu West","Lamu Central"],
        "Taita Taveta":["Voi","Taita","Mwatate","Taveta"]
    },
    "Eastern": {
        "Meru":["Igembe South","Igembe Central","Igembe North","Tigania West","Tigania East","Buuri West","Buuri East","Imenti North","Imenti South","Meru Central","Tigania Central","Imenti East","Mutuati","Abogeta","Kiengu","Igoji"],
        "Tharaka Nithi":["Maara","Igambang'ombe","Tharaka North","Tharaka South","Muthambi","Chiakariga","Meru South","Igamba Ng'ombe"],
        "Embu":["Embu East","Embu North","Mbeere South","Mbeere North","Embu West","Mwea"],
        "Kitui":["Mutitu North","Mwingi West","Mwingi Central","Kitui West","Tseikuru","Kitui Central","Nzambani","Thagicu","Mwingi East","Ikutha","Katulani","Kisasi","Kyuso","Lower Yatta","Matinyani","Mumoni","Mutomo","Mutitu","Migwani"],
        "Machakos":["Masinga","Yatta","Kangundo","Matungulu","Kathiani","Kalama","Machakos","Mwala","Athi-River","Athi River"],
        "Makueni":["Mbooni East","Mbooni West","Kilungu","Mukaa","Makueni","Kambu","Kibwezi","Nzaui","Makindu","Kathonzweni"],
        "Isiolo":["Garbatulla","Isiolo","Merti","Sericho","Cherab","Oldonyiro","Garbatula"],
        "Marsabit":["Moyale","North Horr","Sololo","Loiyangalani","Chalbi","Marsabit","Laisamis","Turbi Bubisa","Dukana"]
    },
    "North Eastern": {
        "Garissa":["Garissa","Balambala","Lagdera","Dadaab","Fafi","Ijara","Liboi","Bura East","Shantabaq","Benaney","Bothai","Sankuri","Hulugho","Shantaabaq"],
        "Wajir":["Wajir North","Wajir East","Tarbaj","Wajir West","Eldas","Wajir South","Buna","Habaswein","Hadado","Korondille","Diif","Sabuli","Khorof Harar","Kutulo Wajir","Eldas South"],
        "Mandera":["Mandera West","Banisa","Mandera North","Dandu","Mandera East","Lafey","Mandera Central","Ashabito","Kutulo","Arabia","Khalalio","Kiliwehiri","Kiliweheri"]
    },
    "Nyanza": {
        "Kisumu":["Kadibo","Kisumu East","Kisumu West","Kisumu Central","Muhoroni","Nyakach","Nyando","Seme"],
        "Siaya":["Siaya","Bondo","Rarieda","Ugunja","Ugenya","Gem Yala","Gem Wagai","Usigu"],
        "Homa Bay":["Rachuonyo South","Rachuonyo North","Rachuonyo East","Homa Bay","Mbita","Suba","Ndhiwa","Rangwe","Suba West","Suba Central"],
        "Migori":["Awendo","Kuria East","Kuria West","Nyatike North","Rongo","Migori","Suna West","Uriri","Mabera","Nyatike South","Nyatike West","Ntimaru","Nyatike"],
        "Kisii":["Etago","Kitutu Central","Sameta","Nyamache","South Masaba","Marani","Kisii South","Kisii Central","Kenyenya","South Gucha","Gucha"],
        "Nyamira":["Borabu","Nyamira North","North Masaba","Nyamira","Manga"]
    },
    "Rift Valley": {
        "Turkana":["Turkana North","Turkana West","Loima","Turkana South","Turkana East","Turkana Central","Kibish","Lokichoggio","Aroo","Lokiriama","Suguta"],
        "West Pokot":["North Pokot","Kipkomo","Pokot Central","West Pokot","Kacheliba","Pokot South"],
        "Samburu":["Samburu North","Samburu East","Samburu Central"],
        "Trans Nzoia":["Trans Nzoia West","Kwanza","Endebess","Kiminini","Trans Nzoia East"],
        "Uasin Gishu":["Soy","Turbo","Moiben","Ainabkoi","Kapseret","Kesses","Kapsaret"],
        "Elgeyo Marakwet":["Keiyo North","Keiyo South","Keiyo","Marakwet East","Marakwet West"],
        "Nandi":["Tinderet","Nandi East","Nandi South","Chesumei","Nandi North","Nandi Central"],
        "Baringo":["Baringo North","Mogotio","Baringo Central","Tiaty West","Tiaty East","Koibatek","Marigat"],
        "Laikipia":["Laikipia East","Laikipia West","Nyahururu","Laikipia North","Laikipia Central","Kirima"],
        "Nakuru":["Nakuru East","Nakuru West","Naivasha","Rongai","Gilgil","Njoro","Molo","Subukia","Kuresoi South","Kuresoi North","Nakuru North","Nakuru"],
        "Narok":["Narok Central","Narok North","Narok South","Narok West","Trans Mara East","Narok East","Trans Mara West","Trans Mara South","Trans-Mara East"],
        "Kajiado":["Kajiado North","Kajiado West","Kajiado Central","Loitokitok","Mashuru","Elangata Wuas","Oloililai","Isinya","Elang'ata Wuas"],
        "Kericho":["Belgut","Kericho","Kipkelion","Soin Sigowet","Bureti","Londiani"],
        "Bomet":["Sotik","Chepalungu","Bomet Central","Bomet East","Konoin","Bomet"]
    },
    "Western": {
        "Kakamega":["Kakamega Central","Kakamega South","Mumias East","Mumias West","Matete","Butere","Khwisero","Likuyani","Lugari","Kakamega East","Kakamega North","Matungu","Navakholo","Mumias"],
        "Vihiga":["Luanda","Sabatia","Emuhaya","Hamisi","Vihiga"],
        "Bungoma":["Kimilili","Bumula","Mt. Elgon","Bungoma Central","Bungoma East","Bungoma North","Bungoma West","Tongaren","Bungoma South","Cheptais","Kopsiro","Kimaeti","Webuye West"],
        "Busia":["Teso North","Teso South","Teso Central","Samia","Butula","Bunyala","Busia","Nambale"]
    }
}

all_schools = []

for region, counties in regions.items():
    print(f"\n===== {region} =====")

    for county, subs in counties.items():
        print(f"County: {county}")

        for sub in subs:
            print(f"  {sub}")

            page = 1

            while True:
                try:
                    r = requests.get(
                        f"{BASE_URL}/filter/senior-schools",
                        params={
                            "region": region,
                            "county": county,
                            "sub-county": sub,
                            "page": page
                        },
                        timeout=20
                    )

                    data = r.json()

                    schools = data.get("senior_schools", [])

                    if not schools:
                        break

                    all_schools.extend(schools)

                    print(f"    Page {page}: {len(schools)} schools")

                    if len(schools) < 10:
                        break

                    page += 1
                    time.sleep(0.2)

                except Exception as e:
                    print(e)
                    break

print("\nTotal schools:", len(all_schools))

with open("kenya_senior_schools.json","w",encoding="utf-8") as f:
    json.dump(all_schools,f,indent=4,ensure_ascii=False)

print("Saved kenya_senior_schools.json")