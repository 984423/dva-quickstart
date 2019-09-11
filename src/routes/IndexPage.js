import React, { Component } from "react";
import ReactSwipes from "react-swipes";
import { connect } from "dva";
import { SearchBar } from "antd-mobile";
import styles from "./IndexPage.less";
import HeadNode from "./HeadNode";
import FooterNode from "./FooterNode";
import TitleNode from "./TitleNode";
import ReactPullLoad, { STATS } from "react-pullload";

const loadMoreLimitNum = 2;

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      hasMore: true,
      data: [],
      action: STATS.init,
      index: loadMoreLimitNum,
      page: 0
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { viewTable, recomenData } = this.props.IndexPageModel;
    dispatch({ type: "IndexPageModel/getApplist", payload: { viewTable } });
    dispatch({ type: "IndexPageModel/getAPPRecomendData", payload: { recomenData } });
  }

  onChange = value => {
    const { dispatch } = this.props;
    dispatch({ type: "IndexPageModel/getApplistSchome", payload: { name: value } });
    dispatch({ type: "IndexPageModel/getAPPRecomendData", payload: { name: value } });
    this.setState({ value });
  };

  handleAction = action => {
    const { viewTable} = this.props.IndexPageModel;
    if (action === STATS.refreshing) {
      //刷新
      this.handRefreshing();
    } else if (action === STATS.loading) {
      //加载更多
      this.handLoadMore(viewTable);
    } else {
      this.setState({
        action: action
      });
    }
  };

  //刷新
  handRefreshing = () => {
    if (STATS.refreshing === this.state.action) {
      return false;
    }
    setTimeout(() => {
      this.setState({
        data: [],
        hasMore: true,
        action: STATS.refreshed,
        index: loadMoreLimitNum
      });
    }, 1000);

    this.setState({
      action: STATS.refreshing
    });
  };

  //加载更多
  handLoadMore = viewTable => {
    const { dispatch  } = this.props;
    if (STATS.loading === this.state.action) {
      return false;
    }
    setTimeout(() => {
      if (this.state.index === 0) {
        this.setState({
          action: STATS.reset,
          hasMore: false
        });
      } else {
        this.setState({
          data: [...this.state.data, viewTable[0], viewTable[0]],
          action: STATS.reset,
          index: this.state.index - 1
        });
      }
    }, 1200);
    this.setState({ action: STATS.loading,page:this.state.page+10 });
    
    dispatch({ type: "IndexPageModel/getApplist", payload: { page: this.state.page+10 } });
  };

  render() {
    const { viewTable, recomenData } = this.props.IndexPageModel;
    const {hasMore } = this.state;
    let opMobile = {
      distance: 90, // 每次移动的距离，卡片的真实宽度
      currentPoint: 0, // 初始位置，默认从0即第一个元素开始
      swTouchstart: ev => {},
      swTouchmove: ev => {},
      swTouchend: ev => {
        let data = {
          moved: ev.moved,
          originalPoint: ev.originalPoint,
          newPoint: ev.newPoint,
          cancelled: ev.cancelled
        };
      }
    };

    return (
      <div className={styles.normal}>
        <SearchBar
          placeholder="Search"
          maxLength={8}
          onChange={this.onChange.bind(this)}
          ref={ref => (this.autoFocusInst = ref)}
          className={styles.fixTop}
        />
        <ReactPullLoad
          ref="reactpullload"
          className="block"
          isBlockContainer={true}
          HeadNode={HeadNode}
          FooterNode={FooterNode}
          action={this.state.action}
          handleAction={this.handleAction}
          hasMore={hasMore}
          style={{ paddingTop: 0 }}
        >
          <section>
           <TitleNode/>
            <div className={styles.viewport}>
              <div className="card-swipe">
                {recomenData.length > 0 ? (
                  <ReactSwipes className="card-slide" options={opMobile}>
                    
                    {recomenData.map((val, index) => (

                      <div className="card-item" key={index}>
                        <img
                          width="70px"
                          src={val["im:image"][0].label}
                          style={{ borderRadius: "24%" }}
                        />
                        <p><strong>{val["im:name"].label}</strong></p>
                        <p style={{ color: "#989494" }}>{val["im:contentType"].attributes.label}</p>
                      </div>
                     
                    ))}
                    
                  </ReactSwipes>
                ) : null}
                {recomenData.length === 0?(<div className={styles.sizeNull}>暂无更多的数据</div>):null}
              </div>
            </div>
            <ul className="test-ul">
              {viewTable.map((val, index) => ( 
                <div key={index} className={styles.center}>
                  <div className={styles.flxsFelt}>
                    <span className={styles.imgSize}>{index}</span>
                    <img
                      style={{ borderRadius: index % 2 === 1 ? "50%" : "none" }}
                      src={val["im:image"][0].label}
                    ></img>
                  </div>
                  <div className={styles.flxsRig}>
                    <strong>{val ? val["im:name"].label : ""}</strong>
                    <p className={styles.color}>
                      {val ? val["category"]["attributes"].label : ""}
                    </p>
                    <div>
                      <p className={styles.background2}></p>
                      <span className={styles.ClorSize}>
                        {"(" + index + "2" + ")"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </section>
        </ReactPullLoad>
      </div>
    );
  }
}

export default connect(({ IndexPageModel }) => ({
  IndexPageModel
}))(IndexPage);
