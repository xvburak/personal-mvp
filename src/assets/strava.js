const auth_link = "https://www.strava.com/oauth/token"

function getActicities(res) {

    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
    fetch(activities_link)
        .then(response => response.json())
        .then(data => {
        const activitiesContainer = document.getElementById('activities-container');

        

        
        data.forEach(activity => {

            const dateStr = activity.start_date_local;
            const dateObj = new Date(dateStr);
            const year = dateObj.getFullYear().toString().substr(-2);
            const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
            const day = dateObj.getDate().toString().padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;

            const activityElement = document.createElement('div');
            activityElement.classList.add('post');

            const dateElement = document.createElement('p');
            dateElement.innerText = formattedDate;
            dateElement.classList.add('date');
            activityElement.appendChild(dateElement);
            
            const nameElement = document.createElement('p');
            nameElement.innerText = activity.name;
            nameElement.classList.add('run-name');
            activityElement.appendChild(nameElement);

            const infoElement = document.createElement('div');
            infoElement.classList.add('run-info');
            
            const distanceElement = document.createElement('p');
            distanceElement.innerText = `${(activity.distance/1000).toFixed(1)} km`;
            infoElement.appendChild(distanceElement);

            const separe = document.createElement('p');
            separe.innerText = `|`;
            infoElement.appendChild(separe);
            
            // const timeElement = document.createElement('p');
            // timeElement.innerText = `${(activity.moving_time/60).toFixed(1)}`;
            // infoElement.appendChild(timeElement);

            const paceElement = document.createElement('p');
            paceElement.innerText = `${((activity.moving_time/60)/(activity.distance/1000)).toFixed(1)} /km`;
            infoElement.appendChild(paceElement);

            activityElement.appendChild(infoElement);
            activitiesContainer.appendChild(activityElement);
        });
        })
        .catch(error => console.error(error));

}

function reAuthorize(){
    fetch(auth_link, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({

            client_id: '104023',
            client_secret: 'af08fc7ee2dd0d33f87984883b6daf1833d8fd52',
            refresh_token: '8bb2b2f7a237257807c558f5cc98c734494a836f',
            grant_type: 'refresh_token'
            
        })
    }).then(res => res.json())
        .then(res => getActicities(res))
}

reAuthorize()


