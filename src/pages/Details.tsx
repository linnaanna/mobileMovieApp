import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import useAPI, { DetailsResults } from "../hooks/useAPI";

interface DetailsPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const Details: React.FC<DetailsPageProps> = ({ match }) => {
  const { getDetails } = useAPI();
  const [information, setInformation] = useState<DetailsResults>(null);

  useIonViewWillEnter(async () => {
    const id = match.params.id;
    const data = await getDetails(id);
    setInformation(data);
    console.log(data);
    console.log(id);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/movies"></IonBackButton>
          </IonButtons>
          <IonTitle>Page Title</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">UI goes here</IonContent>
    </IonPage>
  );
};

export default Details;
