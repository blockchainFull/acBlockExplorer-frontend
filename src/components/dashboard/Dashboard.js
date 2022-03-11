import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Block from './Block';
import Transaction from './Transaction';
import { getLatestBlocks, getSearchResult } from '../../actions/block';
import { getLatestTransactions } from '../../actions/transaction';
import logo from '../../img/ancientcoin.png';
import '../../style.css';

const Dashboard = ({  
  getLatestBlocks,
  getLatestTransactions,
  block,
  transaction,
  getSearchResult,
  searchResult
}) => {
  useEffect(() => {
    getLatestBlocks();
    getLatestTransactions();
  }, []);

  const [blocksData, SetBlocksData] = useState({});
  const [transactionsData, SetTransactionsData] = useState({});

  useEffect(() => {
    SetBlocksData(block.blocks);
  },[block]);

  useEffect(() => {
    SetTransactionsData(transaction.transactions);
  },[transaction]);

  useEffect(() => {
    SetBlocksData([searchResult.block_result]);
    SetTransactionsData(searchResult.transaction_result);
  }, [searchResult]);
//   setTimeout(() => {
//       getLatestBlocks();
//   }, 4000);

  const searchBlocksTransactions = () => {
    console.log(document.getElementById('searchInfo').value);
    if(!document.getElementById('searchInfo').value)
    {
      getLatestBlocks();
      getLatestTransactions();
    }
    else
      getSearchResult(document.getElementById('searchInfo').value);
  }

  return (
    <section className="naji-container">
            
            <header className="naji-header">
                <div className="naji-header_logoContainer">
                    <a className="" href="/">
                        <img src={logo}  className="naji-header_logoImg" alt="logo" />
                    </a>
                </div>
                <div className="naji-header_titleContainer">
                    <a className="naji-LocalizedLink_link" href="#">
                        <b>Ancient Coin</b><span> BlockChain Explorer</span>
                    </a>
                </div>
                <div className="naji-Header_triangleSign">
                    <div className="naji-Header_straightLine">
                
                    </div>
                    <div className="naji-Header_triangle">
                        <div className="naji-Header_innerTriangle">
                
                        </div>
                    </div>
                </div>
            </header>

            <div className="naji-searchContainer">
                <h2 className="naji-Search_searchTitle">Search</h2>
                <div className="naji-Search_searchContent">
                    <div className="naji-Search_searchInput naji-SimpleFormField_root">
                        <div className="naji-SimpleFormField_inputWrapper">
                            <input className="naji-SimpleInput_input" placeholder="Search blocks, addresses and transactions" id="searchInfo"/>
                        </div>
                    </div>
                    <button className="naji-Search_searchButton naji-SimpleButton_root" onClick={() => searchBlocksTransactions()}>
                        <div className="naji-Search_searchButtonIcon">
                            <div className="naji-Search_searchButtonInner">
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <Block block={blocksData} />

            <Transaction transaction={transactionsData} />
            {/* <Block block={block.blocks} />

            <Transaction transaction={transaction.transactions} /> */}

    </section>
  );
};

Dashboard.propTypes = {
  getLatestBlocks: PropTypes.func.isRequired,
  getSearchResult: PropTypes.func.isRequired,
  block: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  searchResult: state.block.searchResult,
  block: state.block,
  transaction: state.transaction
});

export default connect(mapStateToProps, { getLatestTransactions, getLatestBlocks, getSearchResult })(
  Dashboard
);
