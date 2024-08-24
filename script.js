$(function() {
    const ascii_art = `
 __          __  _                          
 \\ \\        / / | |                         
  \\ \\  /\\  / /__| | ___ ___  _ __ ___   ___ 
   \\ \\/  \\/ / _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\
    \\  /\\  /  __/ | (_| (_) | | | | | |  __/
     \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___|
                                            
`;

    const fileSystem = {
        'experience': {
            'SoftwareEngineer_Qomply.txt': {
                company: 'Qomply',
                title: 'Software Engineer',
                location: 'London, UK',
                duration: 'Jun 2023 - Present',
                responsibilities: [
                    'Built event-driven ledger-style backend with FastAPI, AWS SQS and MySQL to model transaction states',
                    'Developed \'rule engines\' which efficiently validate transaction reports according to regulator specifications, applying 3000 rules to 500K rows in 2 min using Python (pandas, numpy) and Django',
                    'Wrote scripts which aggregate monthly statistics using Python and MySQL, run as CRON jobs nightly',
                    'Created Python tools for generating, validating, and diffing XML files, improving script performance by 100x through iterative parsing'
                ]
            },
            'DataEngineeringIntern_Amazon.txt': {
                company: 'Amazon',
                title: 'Data Engineering Intern',
                location: 'London, UK',
                duration: 'Jun 2022 - Oct 2022',
                responsibilities: [
                    'Collaborated with the EU Data Reporting team to identify and rectify inaccurate recruitment datasets needed for analysis',
                    'Performed data cleansing and analysis on large-scale datasets (60M+ records) using SQL and Python (pandas), providing data-driven insights into hiring process optimization',
                    'Conducted statistical analyses and created visualizations to quantify the impact of proposed interventions, identifying opportunities for cycle time reductions of up to 35% in specific scenarios',
                    'Presented actionable recommendations to senior leadership, including optimisations of hiring processes, platform improvements for ad-hoc analysis, and more accurate metrics to track hiring pipeline times'
                ]
            },
            'OperationsIntern_Amazon.txt': {
                company: 'Amazon',
                title: 'Operations Intern',
                location: 'Mansfield, UK',
                duration: 'Jun 2021 - Oct 2021',
                responsibilities: [
                    'Liaised with robotics, data analytics, and operations teams to identify process inefficiencies and design, test, and implement improvements of fulfillment centre processes, focusing on optimal use of Kiva robotic storage and implemented new process workflow',
                    'Analysed billion-row datasets with SQL Redshift and Python, to identify areas of improvement, and quantify impact of proposed interventions; implemented new methods of monitoring process health',
                    'Estimated cost savings of £148,000 per year per fulfillment centre, presented project to senior management, later deployed at UK and EU-wide level'
                ]
            },
            'UniversityAdvisor_InvestIN.txt': {
                company: 'InvestIN Education',
                title: 'University Advisor for the Young Engineer Program',
                location: 'London, UK',
                duration: 'Jun 2021 - Oct 2021',
                responsibilities: [
                    'Worked in a team with other university advisors to help students understand engineering topics, giving tangible examples of theoretical principles; participated in panel Q&As about improving university applications',
                    'Guided students\' discussions during creative problem-solving / engineering design challenges'
                ]
            }
        },
        'projects': {
            'google_summer_of_code.txt': {
                name: 'Google Summer of Code — Finding Exoplanets with Astronomical Observations',
                duration: 'May 2022 - Nov 2022',
                details: [
                    'Collaborated with CERN researchers to develop deep learning systems to detect exoplanets using lightcurves timeseries data',
                    'Built processes to handle large volumes of time-series data, using numpy and pandas for outlier removal, normalization, data stitching, and imputation, resulting in robust data processing of 100+ GB of data',
                    'Applied state-of-the-art time-series classification algorithms (TimeSeriesTransformer, XceptionTime) with emphasis on leveraging the \'tsai\' library, leading to accuracy of 82%'
                ]
            },
            'aihack21.txt': {
                name: 'Runner-Up at AIHACK21 — UK\'s largest student AI hackathon',
                year: '2021',
                details: [
                    'Collaborated in a team of 4 to implement machine learning algorithms for regression on the Boston Housing dataset',
                    'Detected and corrected errors in the dataset and conducted spatial analysis, best performance with a random forest',
                    'Placed 2nd out of 30 teams'
                ]
            },
            'finalyzr.txt': {
                name: 'Finalyzr — bringing data science to portfolio analysis',
                duration: 'Jun 2020 - Oct 2021',
                details: [
                    'Web application built with Python and Django to improve trading habits of retail traders',
                    'Users input their trade data and receive information such as their risk appetite, returns vs benchmarks, including a proprietary metric to \'score\' trades',
                    'Awarded AWS Proof of Concept Funding'
                ]
            }
        },
        'education': {
            'imperial_college.txt': {
                institution: 'Imperial College London',
                degree: 'MEng. Civil Engineering',
                duration: '2019 - 2023',
                grade: 'Upper Second Class (2:1) [67%]',
                thesis: 'Towards Accurate Simulations of Space-Based Solar Power [84%]',
                achievements: [
                    'Awarded runner-up prize for best Transportation paper [2nd/50]',
                    'Presented findings at International Energy from Space conference to European Space Agency (ESA) and UK Chief Scientific Adviser'
                ]
            },
            'lycee_francais.txt': {
                institution: 'Lycée Français Charles de Gaulle',
                degree: 'French Baccalaureate',
                duration: '2010 - 2019',
                grade: 'High school diploma (A-level equivalent) - Highest Honors [17.87/20] in scientific stream'
            }
        }
    };

    let currentDirectory = '/';

    function getPath(path) {
        if (path === '/') return fileSystem;
        const parts = path.split('/').filter(Boolean);
        let current = fileSystem;
        for (const part of parts) {
            if (current[part]) {
                current = current[part];
            } else {
                return null;
            }
        }
        return current;
    }

    function formatJob(job) {
        return [
            `${job.title} - ${job.company}`,
            `${job.location} | ${job.duration}`,
            '-'.repeat(40),
            ...job.responsibilities.map(r => `• ${r}`),
            ''
        ].join('\n');
    }

    function formatProject(project) {
        if (!project || typeof project !== 'object') {
            return 'Error: Project data is not available.';
        }

        const lines = [
            project.name || 'Unnamed Project',
            project.duration || project.year || 'Date not specified',
            '-'.repeat(40),
            ...(Array.isArray(project.details) 
                ? project.details.map(d => `• ${d}`)
                : ['No project details available.']),
            ''
        ];

        return lines.join('\n');
    }

    function formatEducation(edu) {
        if (!edu || typeof edu !== 'object') {
            return 'Error: Education data is not available.';
        }

        const lines = [
            edu.institution,
            edu.degree,
            edu.duration,
            '-'.repeat(40),
            `Grade: ${edu.grade}`
        ];

        if (edu.thesis) {
            lines.push(`Thesis: ${edu.thesis}`);
        }

        if (Array.isArray(edu.achievements)) {
            lines.push('Achievements:');
            lines.push(...edu.achievements.map(a => `• ${a}`));
        }

        lines.push('');
        return lines.join('\n');
    }

    function isDirectory(item) {
        return item && typeof item === 'object' && !Array.isArray(item) 
            && !item.hasOwnProperty('company') && !item.hasOwnProperty('name') 
            && !item.hasOwnProperty('institution');
    }

    $('#terminal').terminal({
        help: function() {
            this.echo(
                'Usage: command [arguments]\n\n' +
                'Commands:\n' +
                '  whoami                 Display information about me\n' +
                '  ls                     List contents of current directory\n' +
                '  cd <directory>         Change the current directory\n' +
                '  cat <file>             Display file contents\n' +
                '  pwd                    Print working directory\n' +
                '  contact                Show contact information\n' +
                '  clear                  Clear the terminal screen\n' +
                '  help                   Display this help message\n'
            );
        },
        whoami: function() {
            this.echo('Jack McNish');
            this.echo('Self-taught software engineer with a passion for computer science.');
        },
        ls: function() {
            const contents = getPath(currentDirectory);
            if (contents) {
                Object.keys(contents).forEach(item => {
                    this.echo(isDirectory(contents[item]) ? item + '/' : item);
                });
            } else {
                this.error(`ls: cannot access ${currentDirectory}: No such file or directory`);
            }
        },
        cd: function(dir) {
            if (!dir || dir === '/') {
                currentDirectory = '/';
            } else if (dir === '..') {
                const parts = currentDirectory.split('/').filter(Boolean);
                parts.pop();
                currentDirectory = '/' + parts.join('/');
            } else {
                const newPath = currentDirectory === '/' ? currentDirectory + dir : currentDirectory + '/' + dir;
                const newDir = getPath(newPath);
                if (newDir && isDirectory(newDir)) {
                    currentDirectory = newPath;
                } else {
                    this.error(`cd: ${dir}: Not a directory`);
                }
            }
            this.set_prompt(`jack@portfolio:${currentDirectory}$ `);
        },
        cat: function(file) {
            const filePath = currentDirectory === '/' ? currentDirectory + file : currentDirectory + '/' + file;
            const contents = getPath(filePath);
            if (contents && !isDirectory(contents)) {
                if (contents.hasOwnProperty('company')) {
                    this.echo(formatJob(contents));
                } else if (contents.hasOwnProperty('name')) {
                    this.echo(formatProject(contents));
                } else if (contents.hasOwnProperty('institution')) {
                    this.echo(formatEducation(contents));
                }
            } else {
                this.error(`cat: ${file}: No such file or directory`);
            }
        },
        pwd: function() {
            this.echo(currentDirectory);
        },
        contact: function() {
            this.echo('Email:    jackmcnish333@gmail.com');
            this.echo('GitHub:   https://github.com/torus403');
            this.echo('LinkedIn: https://linkedin.com/in/jack-mcnish-b408b31b3');
        }
    }, {
        greetings: ascii_art + 'Welcome to my website!\nType "help" for available commands.\n',
        prompt: 'jackmcnish@portfolio ~ % ',
        completion: function(command, callback) {
            if (command === 'cd' || command === 'cat') {
                const contents = getPath(currentDirectory);
                if (contents) {
                    callback(Object.keys(contents).filter(item => 
                        command === 'cd' ? isDirectory(contents[item]) : !isDirectory(contents[item])
                    ));
                } else {
                    callback([]);
                }
            } else {
                callback(['help', 'whoami', 'ls', 'cd', 'cat', 'pwd', 'contact', 'clear']);
            }
        }
    });
});
