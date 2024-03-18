import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import useAPI, { SearchResult, SearchType } from "../hooks/useAPI";
import React, { useState, useEffect } from "react";
import {
  videocamOutline,
  tvOutline,
  gameControllerOutline,
} from "ionicons/icons";

const Home: React.FC = () => {
  const { searchData } = useAPI();

  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [presentAlert] = useIonAlert();
  const [loading, dismiss] = useIonLoading();

  useEffect(() => {
    if (searchTerm === "") {
      setResults([]);
      return;
    }

    const loadData = async () => {
      await loading();
      const result: any = await searchData(searchTerm, type);
      console.log(result);
      await dismiss();
      if (result?.Error) {
        presentAlert(result.Error);
      } else {
        setResults(result.Search);
      }
    };
    loadData();
  }, [searchTerm, type]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>My Movie App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          value={searchTerm}
          debounce={300}
          onIonChange={(e) => setSearchTerm(e.detail.value!)}
        ></IonSearchbar>
        <IonItem>
          <IonLabel>Select Searchtype</IonLabel>
          <IonSelect value={type} onIonChange={(e) => setType(e.detail.value!)}>
            <IonSelectOption value="">All</IonSelectOption>
            <IonSelectOption value="movie">Movie</IonSelectOption>
            <IonSelectOption value="series">Series</IonSelectOption>
            <IonSelectOption value="episode">Episode</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonList>
          {results.map((item: SearchResult) => (
            <IonItem button key={item.imdbID} routerLink="/movies/:id">
              <IonAvatar slot="start">
                <IonImg src={item.Poster} />
              </IonAvatar>
              <IonLabel className="ion-text-wrap">{item.Title}</IonLabel>
              {item.Type === "movie" && (
                <IonIcon slot="end" icon={videocamOutline} />
              )}
              {item.Type === "series" && (
                <IonIcon slot="end" icon={tvOutline} />
              )}
              {item.Type === "game" && (
                <IonIcon slot="end" icon={gameControllerOutline} />
              )}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
