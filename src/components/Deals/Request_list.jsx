import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RequestInfo } from "../../server/Deal_server";

export default function Request_list() {

    const { ad_id } = useParams();

    const [requests, setRequests] =
        useState([]);

    useEffect(() => {

        RequestInfo(ad_id)
            .then((data) => {

                if (data?.success) {
                    setRequests(data.data);
                }

            })
            .catch(console.log);

    }, [ad_id]);

    return (

        <div>

            <h2>
                Requests For Ad #{ad_id}
            </h2>

            {
                requests.map((user) => (

                    <div
                        key={`${user.role}-${user.id}`}
                        style={{
                            border: "1px solid #ddd",
                            padding: "10px",
                            marginBottom: "10px"
                        }}
                    >
                        <img
                            src={
                                user.photo_url
                                    ? `http://localhost:5009/uploads/${user.photo_url}`
                                    : "/default-user.png"
                            }
                            alt=""
                            width="60"
                        />

                        <h3>{user.name}</h3>

                        <p>
                            Role:
                            {user.role}
                        </p>

                        <p>
                            Email:
                            {user.email}
                        </p>

                        <p>
                            Phone:
                            {user.phone}
                        </p>

                        <p>
                            Status:
                            {user.status}
                        </p>

                        {
                            user.role === "investor" &&
                            <>
                                <p>
                                    Total Investment:
                                    {user.total_investment}
                                </p>

                                <p>
                                    Total Profit:
                                    {user.total_profit}
                                </p>
                            </>
                        }
                    </div>

                ))
            }

        </div>
    );
}