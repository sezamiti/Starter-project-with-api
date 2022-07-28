import React from "react"
import {Movies} from '../components/movies'
import {Preloader} from '../components/preloader'
import {Search} from '../components/search'


const API_KEY = process.env.REACT_APP__API_KEY

 
class Main extends React.Component {
    state = { 
        movies: [],
        loading:true
        
    }

    searchMovies = (str, type='all') => {
        this.setState({loading: true})
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${type !== 'all' ? `&type=${type}`:''}`)
            .then((response) => response.json())
            .then((data) => this.setState({ movies: data.Search, loading:false }))
            .catch((err)=>{
                console.error(err);
                this.setState({ loading:false })
            });
    };

    componentDidMount() {
        
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=iron`)
            .then((response) => response.json())
            .then((data) => this.setState({ movies: data.Search, loading:false }))
            .catch((err)=>{
                console.error(err);
                this.setState({ loading:false })
            });
    }

    render() {
        const { movies, loading} = this.state;

        return (
            <main className="container content">
                <Search searchMovies={this.searchMovies} />
                {loading ? (
                        <Preloader />
                    ) : (
                        
                        <Movies movies={movies} />)}
            </main>
        );
    }
}
export {Main}