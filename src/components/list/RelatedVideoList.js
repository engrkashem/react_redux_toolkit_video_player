import React, { useEffect } from "react";
import RelatedVideoListItem from "./RelatedVideoListItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedVideos } from "../../features/relatedVideos/relatedVideosSlice";
import Loading from "../ui/Loading";
import Error from "../ui/Error";

const RelatedVideoList = ({ currentVideoId, tags }) => {
  const dispatch = useDispatch();
  const {relatedVideos, isLoading, isError, error} = useSelector((state) => state.relatedVideos);

  useEffect(() => {
    dispatch(fetchRelatedVideos({ tags, id:currentVideoId }));
  }, [dispatch, currentVideoId, tags]);

  //decide what to render
  let content = null;

  if(isLoading)content=<Loading/>;

  if(!isLoading && isError)content = <Error error={error}/>;

  if(!isError && !isLoading && relatedVideos.length === 0){
    content = <div className="col-span-12">No related videos found.</div>;
  }

  if(!isLoading && !isError && relatedVideos.length){
    content=relatedVideos.map(relatedVideo=><RelatedVideoListItem key={relatedVideo.id} relatedVideo={relatedVideo} />)
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
};

export default RelatedVideoList;
