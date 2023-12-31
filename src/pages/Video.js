import React, { useEffect } from "react";
import VideoPlayer from "../components/videoDetails/VideoPlayer";
import VideoDescription from "../components/videoDetails/VideoDescription";
import RelatedVideoList from "../components/list/RelatedVideoList";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideo } from "../features/video/videoSlice";
import { useParams } from "react-router-dom";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";

const Video = (props) => {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const { video, isLoading, isError, error } = useSelector(
    (state) => state.video
  );

  useEffect(() => {
    dispatch(fetchVideo(videoId));
  }, [dispatch, videoId]);

  const { link, title, id, tags } = video || {};

  // decide what to render
  let content = null;
  if (isLoading) content = <Loading />;

  if (!isLoading && isError) content = <Error error={error} />;

  if (!isLoading && !isError && !video?.id) {
    content = <div className="col-span-12">No video available.</div>;
  }

  if (!isLoading && !isError && video?.id) {
    content = (
      <div className="grid grid-cols-3 gap-2 lg:gap-8">
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
          {/* <!-- video player --> */}
          <VideoPlayer link={link} title={title} />

          {/* <!-- video description --> */}
          <VideoDescription video={video} />
        </div>

        {/* <!-- related videos --> */}
        <RelatedVideoList currentVideoId={id} tags={tags} />
      </div>
    );
  }

  return (
    <section className="pt-6 pb-20">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        {content}
      </div>
    </section>
  );
};

export default Video;
